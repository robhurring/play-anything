import { element, createApp } from "deku";
import { combineReducers, createStore } from "redux";
import systemReducer from "./reducers/system";
import playerReducer from "./reducers/player";
import searchReducer from "./reducers/search";
import App from "./components/App";

const store = createStore(
  combineReducers({
    system: systemReducer,
    player: playerReducer,
    search: searchReducer
  })
);

const render = createApp(document.querySelector('#app'), store.dispatch);

const update = (App, context) => {
  render(<App />, context);
};

update(App, store.getState());

store.subscribe(() => {
  const state = store.getState();
  update(App, state);
});
