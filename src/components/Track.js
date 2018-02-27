import { element } from "deku";

function render({ props, children }) {
  const { album, artists, uri, name } = props.track;

  if (!name) {
    return <div>None</div>;
  }

  return (
    <div>
      <img src={album.images[2].url} />
      <p>Name: { name }</p>
      <p>Artist: { artists[0].name }</p>
      <p>Album: { album.name }</p>
    </div>
  );
}

export default {
  render
};
