import { element } from "deku";
import "../styles/spinner.css";

function render({ props }) {
  const { size, color } = props;

  return (
    <div class={`la-timer la-${size}`} style={`color: ${color}`}>
      <div />
    </div>
  );
}

export default {
  render
};
