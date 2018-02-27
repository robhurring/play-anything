const SpotifyWebApi = require("spotify-web-api-node");

exports.spotifyMiddleware = function(req, res, next) {
  const app = req.app;
  const credentials = app.get("spotify.credentials");
  const api = (req.spotify = new SpotifyWebApi(credentials));

  api.refreshAccessToken().then(
    function(data) {
      const token = data.body["access_token"];
      console.log("refreshed token");
      app.set(
        "spotify.credentials",
        Object.assign({}, credentials, { accessToken: token })
      );
      api.setAccessToken(token);
      next();
    },
    function(err) {
      console.log("token refresh failed", err);
      res.status(500).json({
        error: "could not refresh token"
      });
    }
  );
};

exports.controlMiddleware = function(req, res, next) {
  const perms = req.app.get("permissions");
  console.log("control=", perms.control);

  if(!perms.control) {
    return res.status(400).json({
      error: "Control disabled"
    })
  }

  next();
}

exports.statusMiddleware = function(req, res, next) {
  const perms = req.app.get("permissions");
  console.log("status=", perms.status);

  if(!perms.status) {
    return res.status(400).json({
      error: "status disabled"
    })
  }

  next();
}

exports.nextTrack = function(req, res) {
  req.spotify.skipToNext().then(
    function(data) {
      res.status(204).json({});
    },
    function(err) {
      console.error(err);
      res.status(500).json({
        error: err
      });
    }
  );
};

exports.previousTrack = function(req, res) {
  req.spotify.skipToPrevious().then(
    function(data) {
      res.status(204).json({});
    },
    function(error) {
      console.error(error);
      res.status(500).json({
        error
      });
    }
  );
};

exports.status = function(req, res) {
  req.spotify.getMyCurrentPlaybackState().then(
    function(data) {
      const track = data.body["item"];

      res.status(200).json({
        progress_ms: data.body.progress_ms,
        is_playing: data.body.is_playing,
        track
      });
    },
    function(err) {
      console.error(err);
      res.status(500).json({
        error: err
      });
    }
  );
};

exports.play = function(req, res) {
  const uri = req.body.context_uri;
  let options = {};

  console.log("play=", uri);

  if (uri.match(/spotify:track/)) {
    options.uris = [uri];
  } else {
    options.context_uri = uri;
  }

  console.log("options=", options);

  req.spotify.play(options).then(
    function(data) {
      res.status(204).json({});
    },
    function(err) {
      console.error(err);
      res.status(500).json({
        error: err
      });
    }
  );
};
