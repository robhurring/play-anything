import { SYSTEM_STATUS, STATUS } from "../actions/system";
import { merge } from "../util";

const initial = {
  id: '',
  clients: 0,
  online: false
};

export default function systemReducer(state = initial, action) {
  switch (action.type) {
    case SYSTEM_STATUS:
      return handleSystemStatus(state, action)
    default:
      return state;
  }
}

const handleSystemStatus = (state, action) => {
  switch (action.status) {
    case STATUS.started:
      return state;
    case STATUS.success:
      return merge(state, action.system_status);
    case STATUS.error:
      return merge(state, { error: action.error });
  }
};
