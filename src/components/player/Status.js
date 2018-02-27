import { element } from "deku";
import { isEmptyObject } from "../../util";
import { updateProgress } from "../../actions";
import Progress from "./Progress";

let PROGRESS_TIMEOUT = 1000;
let progressTicker = null;

function render({ props }) {
  let { playing, progress, track } = props;

  let trackName = "Unknown";
  let artistNames = "Unknown";
  let albumName = "Unknown";
  let duration = 0;

  if (!isEmptyObject(track)) {
    const album = track.album;

    trackName = track.name;
    duration = track.duration_ms;
    artistNames = track.artists.map(artist => artist.name).join('&')
    albumName = album.name;
  }

  return (
    <div>
      <h1 class="display-4">{trackName}</h1>
      <p class="lead">
        {artistNames} - {albumName}
      </p>
      <Progress value={progress} max={duration} />
      <p class="text-muted">
        <span class={`oi oi-media-${playing ? "play" : "stop"}`} />&nbsp;
        {playing ? "Playing" : "Stopped"}
      </p>
    </div>
  );
}

function onCreate({ props, dispatch }) {
  progressTicker = setInterval(() => {
    updateProgress(dispatch)(PROGRESS_TIMEOUT);
  }, PROGRESS_TIMEOUT);
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
