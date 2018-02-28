import Api from "../api";

const api = new Api();

export const SEARCH = "SEARCH";

export const STATUS = {
  started: "started",
  success: "success",
  error: "error"
};

export function searchTracks(dispatch) {
  return (query) => {
    dispatch({
      type: SEARCH,
      status: STATUS.started
    });

    api
      .search(query)
      .then(data => {
        dispatch({
          type: SEARCH,
          status: STATUS.success,
          results: data.results
        });
      })
      .catch(err => {
        dispatch({
          type: SEARCH,
          status: STATUS.error,
          error: err.toString()
        });
      });
  };
}


