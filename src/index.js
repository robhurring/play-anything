import { element, createApp } from "deku";
import { combineReducers, createStore } from "redux";
import statsReducer from "./reducers/stats";
import playerReducer from "./reducers/player";
import App from "./components/App";

const store = createStore(
  combineReducers({
    stats: statsReducer,
    player: playerReducer
  })
);

const render = createApp(document.querySelector('#app'), store.dispatch);

const update = (App, context) => {
  render(<App />, context);
};

update(App, store.getState());

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
  update(App, state);
});
