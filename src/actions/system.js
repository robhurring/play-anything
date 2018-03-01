import Api from "../api";

const api = new Api();

export const SYSTEM_STATUS = "SYSTEM_STATUS";

export const STATUS = {
  started: "started",
  success: "success",
  error: "error"
};

export function getStatus(dispatch) {
  return () => {
    dispatch({
      type: SYSTEM_STATUS,
      status: STATUS.started
    });

    api
      .getStatus()
      .then(status => {
        dispatch({
          type: SYSTEM_STATUS,
          status: STATUS.success,
          system_status: status
        });
      })
      .catch(err => {
        dispatch({
          type: SYSTEM_STATUS,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}

