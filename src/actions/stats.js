import Api from "../api";

const api = new Api();

export const STATS = "STATS";

export const STATUS = {
  started: "started",
  success: "success",
  error: "error"
};

export function getStats(dispatch) {
  return () => {
    dispatch({
      type: STATS,
      status: STATUS.started
    });

    api
      .getStats()
      .then(stats => {
        dispatch({
          type: STATS,
          status: STATUS.success,
          stats
        });
      })
      .catch(err => {
        dispatch({
          type: STATS,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}

