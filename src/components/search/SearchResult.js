import { element } from "deku";
import { play } from '../../actions/player'

function render({ props, dispatch, context }) {
  const { track } = props;
  let { album } = track;

  let albumImageUrl = album.images[2].url;
  let albumName = album.name
  let artistNames = album.artists.map(artist => artist.name).join(", ");

  let playTrack = dispatch => e => {
    play(dispatch)(track.uri)
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-1">
          <img class="img-thumbnail" src={albumImageUrl} />
        </div>
        <div class="col-sm-9">
          <div class="row">
            <strong>{track.name}</strong>
          </div>
          <div class="row">
            {artistNames} - {albumName}
          </div>
        </div>
        <div class="col-sm-2 text-right">
          <button class="btn btn-lg btn-secondary" onClick={playTrack(dispatch)}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default {
  render
};
