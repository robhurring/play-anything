const SpotifyWebApi = require("spotify-web-api-node");

exports.apiMiddleware = (req, res, next) => {
  const app = req.app;
  const credentials = app.get("spotify.credentials");
  const api = (req.spotify = new SpotifyWebApi(credentials));

  api.refreshAccessToken().then(
    data => {
      const token = data.body["access_token"];
      console.log("refreshed token");
      app.set(
        "spotify.credentials",
        Object.assign({}, credentials, { accessToken: token })
      );
      api.setAccessToken(token);
      next();
    },
    err => {
      console.log("token refresh failed", err);
      res.status(500).json({
        error: "could not refresh token"
      });
    }
  );
};

exports.status = (req, res) => {
  req.spotify.getMyCurrentPlaybackState().then(
    data => {
      const track = data.body["item"];

      res.status(200).json({
        progress_ms: data.body.progress_ms,
        is_playing: data.body.is_playing,
        track
      });
    },
    err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    }
  );
};

exports.play = (req, res) => {
  const uri = req.body.context_uri;
  let options = {};

  console.log(`play=${uri}`);

  if (uri.match(/spotify:track/)) {
    options.uris = [uri];
  } else {
    options.context_uri = uri;
  }

  console.log(`options=${options}`);

  req.spotify.play(options).then(
    data => {
      res.status(204).json({});
    },
    err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    }
  );
};
