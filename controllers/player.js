exports.nextTrack = function(req, res) {
  req.spotify.skipToNext().then(
    function(data) {
      res.status(204).json({});
    },
    function(err) {
      console.error(err);
      res.status(500).json({
        error: err
      })
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
      })
    }
  );
};

exports.state = function(req, res) {
  req.spotify.getMyCurrentPlaybackState().then(
    function(data) {
      const track = data.body['item'];

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
      })
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
      })
    }
  );
};
