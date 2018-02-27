var express = require("express"),
  http = require("http"),
  errorhandler = require("errorhandler"),
  static = require("serve-static"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  SpotifyWebApi = require("spotify-web-api-node"),
  player = require("./controllers/player");

var app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(morgan("dev"));
  app.use(errorhandler());
} else {
  app.use(morgan("combined"));
}

app.set("port", process.env.PORT || 3000);

app.set("spotify.credentials", {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authToken: process.env.SPOTIFY_AUTH_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

app.use(bodyParser.json());
app.use(static("public/", {}));

app.use("/player/*", function(req, res, next) {
  const credentials = app.get("spotify.credentials");
  const api = req.spotify = new SpotifyWebApi(credentials);

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
});

app.get("/player/next", player.nextTrack);
app.get("/player/prev", player.previousTrack);
app.get("/player/state", player.state);
app.put("/player/play", player.play);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
