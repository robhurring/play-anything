import { element } from "deku";

export default function render({ props }) {
  let { album, width, height, placeholder } = props;
  let url = `http://via.placeholder.com/${width}x${height}?text=${placeholder || "N/A"}`;

  if (album) {
    url = album.images[1].url
  }

  return <img src={url} width={width} height={height} class="img-fluid" />;
}
