import { STATS, STATUS } from "../actions/stats";
import { merge } from "../util";

const initial = {
  clients: 0
};

export default function statsReducer(state = initial, action) {
  switch (action.type) {
    case STATS:
      return handleStats(state, action)
    default:
      return state;
  }
}

const handleStats = (state, action) => {
  switch (action.status) {
    case STATUS.started:
      return state;
    case STATUS.success:
      return merge(state, action.stats);
    case STATUS.error:
      return merge(state, { error: action.error });
  }
};
