import { element } from "deku";
import { getStats } from "../actions";

let timeout = 5000;
let ticker;

function render({ props, context }) {
  const { stats } = context;

  return (
    <div class="container">
      <p class="text-muted text-right">
        {stats.clients} clients
      </p>
    </div>
  );
}

function onCreate({ props, dispatch }) {
  const statusFunc = getStats(dispatch);
  statusFunc();
  ticker = setInterval(statusFunc, timeout);
}

function onRemove({ props, dispatch }) {
  if (ticker) {
    clearInterval(ticker);
  }
}

export default {
  render,
  onCreate,
  onRemove
};
