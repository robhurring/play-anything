import { SEARCH, STATUS } from "../actions/search";
import { merge } from "../util";

const initial = {
  in_progress: false,
  term: "",
  results: [],
  error: null
};

export default function searchReducer(state = initial, action) {
  switch (action.type) {
    case SEARCH:
      return handleSearch(state, action);
    default:
      return state;
  }
}

const handleSearch = (state, action) => {
  switch (action.status) {
    case STATUS.started:
      return merge(state, { in_progress: true });
    case STATUS.success:
      console.log(action.results);
      return merge(state, { in_progress: false, results: action.results });
    case STATUS.error:
      console.log(action.error);
      return merge(state, { in_progress: false, error: action.error });
    default:
      return state;
  }
};
