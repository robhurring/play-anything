import Api from "../api";

const api = new Api();

export const STATUS = {
  started: "started",
  success: "success",
  error: "error"
};

export const PLAYER_STATUS = "PLAYER_STATUS";
export const PLAYER_PROGRESS = "PLAYER_PROGRESS";
export const PLAYER_PLAY = "PLAYER_PLAY";

export function getPlayerStatus(dispatch) {
  return () => {
    dispatch({
      type: PLAYER_STATUS,
      status: STATUS.started
    });

    api
      .getPlayerStatus()
      .then(player => {
        dispatch({
          type: PLAYER_STATUS,
          status: STATUS.success,
          player
        });
      })
      .catch(err => {
        dispatch({
          type: PLAYER_STATUS,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}

export function updateProgress(dispatch) {
  return increment => {
    dispatch({
      type: PLAYER_PROGRESS,
      increment
    });
  };
}

export function play(dispatch) {
  return uri => {
    dispatch({
      type: PLAYER_PLAY,
      status: STATUS.started
    });

    api
      .play(uri)
      .then(json => {
        dispatch({
          type: PLAYER_PLAY,
          status: STATUS.success
        });

        // force status update
        return getPlayerStatus(dispatch)();
      })
      .catch(err => {
        dispatch({
          type: PLAYER_PLAY,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}

