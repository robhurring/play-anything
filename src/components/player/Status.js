import { element } from "deku";
import { isEmptyObject } from "../../util";
import { updateProgress } from "../../actions/player";
import Progress from "./Progress";

let PROGRESS_TIMEOUT = 1000;
let progressTicker = null;

function render({ props }) {
  let { playing, progress, track } = props;

  let trackName = "Unknown";
  let artistNames = "Unknown";
  let albumName = "Unknown";
  let duration = 0;
  let listenUrl = null;
  let previewUrl = null;

  if (!isEmptyObject(track)) {
    const album = track.album;

    trackName = track.name;
    duration = track.duration_ms;
    artistNames = track.artists.map(artist => artist.name).join("&");
    albumName = album.name;
    listenUrl = track.external_urls.spotify;
    previewUrl = track.preview_url;
  }

  let listen = <span />;
  if (listenUrl) {
    listen = (
      <div class="text-muted mr-sm-5">
        <span class="oi oi-audio mr-2" />
        <a href={listenUrl} target="_blank">
          Listen
        </a>
      </div>
    );
  }

  let preview = <span />;
  if (preview) {
    preview = (
      <div class="text-muted mr-sm-5">
        <span class="oi oi-audio-spectrum mr-2" />
        <a href={previewUrl} target="_blank">
          Preview
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 class="display-4">{trackName}</h1>
      <p class="lead">
        {artistNames} - {albumName}
      </p>
      <Progress value={progress} max={duration} />
      <div class="d-flex mb-3">
        <div class="text-muted mr-sm-5">
          <span class={`oi oi-media-${playing ? "play" : "stop"} mr-2`} />
          {playing ? "Playing" : "Stopped"}
        </div>
        {listen}
        {preview}
      </div>
    </div>
  );
}

function onCreate({ props, dispatch }) {
  // progressTicker = setInterval(() => {
  //   updateProgress(dispatch)(PROGRESS_TIMEOUT);
  // }, PROGRESS_TIMEOUT);
}

function onRemove() {
  if (progressTicker) {
    clearInterval(progressTicker);
  }
}

export default {
  render,
  onCreate,
  onRemove
};
