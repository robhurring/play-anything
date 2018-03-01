import { element, createApp } from "deku";
import { applyMiddleware, combineReducers, createStore } from "redux";
import systemReducer from "./reducers/system";
import playerReducer from "./reducers/player";
import searchReducer from "./reducers/search";
import { getStatus } from "./actions/system";
import { renderDiff } from "./util";
import differ from "deep-diff";

import App from "./components/App";

const SYSTEM_STATUS_TIMEOUT = 2500;
const store = createStore(
  combineReducers({
    system: systemReducer,
    player: playerReducer,
    search: searchReducer
  })
);

const render = createApp(document.querySelector("#app"), store.dispatch);

const update = (App, context) => {
  console.log("---> rendering");
  render(<App />, context);
};

const observeStore = (store, onChange) => {
  let prevState = store.getState();

  const handleChange = () => {
    const currentState = store.getState();
    const diff = differ(prevState, currentState);

    if (diff) {
      renderDiff("---> state changed", diff);
      prevState = currentState;
      onChange(currentState);
    }
  };

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

let systemPoller = null;

const startSystemPoller = () => {
  if (!systemPoller) {
    systemPoller = setInterval(
      getStatus(store.dispatch),
      SYSTEM_STATUS_TIMEOUT
    );
  }
};

observeStore(store, state => {
  update(App, state);
});

getStatus(store.dispatch)();
