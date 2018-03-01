import { element } from "deku";
import { getStatus } from "../actions/system";

let timeout = 5000;
let ticker;

function render({ props, context }) {
  const { system } = context;

  return (
    <div class="container">
      <p class="text-muted text-right">
        {system.clients} clients
      </p>
    </div>
  );
}

function onCreate({ props, dispatch }) {
  const statusFunc = getStatus(dispatch);
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
