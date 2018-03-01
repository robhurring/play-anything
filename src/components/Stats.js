import { element } from "deku";
import { getStatus } from "../actions/system";

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

export default {
  render
};
