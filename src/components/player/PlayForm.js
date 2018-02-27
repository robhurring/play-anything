import { element } from "deku";

export default function render({ props, path }) {
  const { onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="form-row">
        <div class="col-10">
          <div class="input-group mb-2 mr-sm-2 p-9">
            <div class="input-group-prepend">
              <div class="input-group-text">URI</div>
            </div>
            <input type="text" class="form-control form-control-lg" />
          </div>
        </div>
        <div class="col-2">
          <button type="submit" class="btn btn-primary btn-lg">
            Play
          </button>
        </div>
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
      input.value = "";
      callback(value);
    }
  };
}
