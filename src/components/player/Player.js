import { element } from "deku";
import { getPlayerStatus, play } from "../../actions/player";
import { isEmptyObject } from "../../util";
import AlbumImage from "./AlbumImage";
import Status from "./Status";
import PlayForm from "./PlayForm";

const STATUS_TIMEOUT = 10000;
let statusTicker = null;

function render({ props, dispatch, context }) {
  const { player } = context;
  const { is_playing, progress_ms, track } = player;
  const { album, artists } = track;

  return (
    <div class="jumbotron container">
      <div class="row">
        <div class="col-sm-3">
          <AlbumImage
            album={album}
            height={295}
            width={300}
            placeholder="None"
          />
        </div>
        <div class="col-sm-9">
          <Status track={track} playing={is_playing} progress={progress_ms} />
          <PlayForm onSubmit={play(dispatch)} />
        </div>
      </div>
    </div>
  );
}

function onCreate({ props, dispatch }) {
  const updateStatus = getPlayerStatus(dispatch);

  updateStatus();
  statusTicker = setInterval(updateStatus, STATUS_TIMEOUT);
}

function onRemove() {
  if (statusTicker) {
    clearInterval(statusTicker);
  }
}

export default {
  render,
  onCreate,
  onRemove
};
