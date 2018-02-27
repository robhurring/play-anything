import { GET_STATS, STATUS } from "../actions";
import { merge } from "../util";

const initial = {
  clients: 0
};

export default function statsReducer(state = initial, action) {
  if (action.type === GET_STATS) {
    switch (action.status) {
      case STATUS.started:
        return state
      case STATUS.success:
        return merge(state, action.stats)
      case STATUS.error:
        return merge(state, {error: action.error})
    }
  }

  return state;
}
