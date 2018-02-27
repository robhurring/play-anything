import { element } from "deku";

export default function render({ props }) {
  const { value, max, min } = props;
  let percent = 0;

  if (value > 0) {
    percent = Math.floor(value / max * 100);
  }

  return (
    <progress value={value} max={max} class="col-sm-12">
      {percent}%
    </progress>
  );
}
