import { element } from "deku";
import Spinner from "../Spinner";

export default function render({ props, path, context }) {
  const { onSubmit } = props;
  const { search } = context;

  let spinner = "";
  if (search.in_progress) {
    spinner = (
      <div class="col-1">
        <Spinner size="1x" color="#555" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="form-row">
        <div class="col-9">
          <input
            type="text"
            class="form-control form-control-lg"
            disabled={search.in_progress ? "disabled" : ""}
            value={search.term}
            placeholder="search"
          />
        </div>
        <div class="col-2">
          <button type="submit" class="btn btn-primary btn-lg">
            Search
          </button>
        </div>
        {spinner}
      </div>
    </form>
  );
}

function handleSubmit(callback) {
  return e => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const value = input.value;

    if (value) {
      callback(value);
    }
  };
}
