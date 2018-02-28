import { PLAYER_STATUS, PLAYER_PROGRESS, PLAYER_PLAY, STATUS } from "../actions/player";
import { merge } from "../util";

const initial = {
  is_playing: false,
  progress_ms: 0,
  track: {}
};

export default function spotifyReducer(state = initial, action) {
  switch (action.type) {
    case PLAYER_STATUS:
      return handleStatus(state, action);
    case PLAYER_PROGRESS:
      return merge(state, {
        progress_ms: state.progress_ms + action.increment
      });
    case PLAYER_PLAY:
      return handlePlay(state, action);
    default:
      return state;
  }
}

const handleStatus = (state, action) => {
  switch (action.status) {
    case STATUS.started:
      return state;
    case STATUS.success:
      return merge(state, action.player);
    case STATUS.error:
      return merge(state, { error: action.error });
  }
};

const handlePlay = (state, action) => {
  switch (action.status) {
    case STATUS.started:
    case STATUS.success:
      console.log(action.status);
      return state;
    case STATUS.error:
      return merge(state, { error: action.error });
  }
};
