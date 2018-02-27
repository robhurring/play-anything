import Api from "./api";

const api = new Api();

export const STATUS = {
  started: "started",
  success: "success",
  error: "error"
};

export const GET_STATS = "GET_STATS";
export const PLAYER_STATUS = "PLAYER_STATUS";
export const PLAYER_PROGRESS = "PLAYER_PROGRESS";
export const PLAY = "PLAY";
export const APP_STARTED = "APP_STARTED";

export function appStarted(dispatch) {
  dispatch({
    type: APP_STARTED
  });
}

export function getStats(dispatch) {
  return () => {
    dispatch({
      type: GET_STATS,
      status: STATUS.started
    });

    api
      .getStats()
      .then(stats => {
        dispatch({
          type: GET_STATS,
          status: STATUS.success,
          stats
        });
      })
      .catch(err => {
        dispatch({
          type: GET_STATS,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}

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
      type: PLAY,
      status: STATUS.started
    });

    api
      .play(uri)
      .then(json => {
        dispatch({
          type: PLAY,
          status: STATUS.success
        });

        // force status update
        return getPlayerStatus(dispatch)();
      })
      .catch(err => {
        dispatch({
          type: PLAY,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}
