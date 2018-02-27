const express = require("express"),
  http = require("http"),
  errorhandler = require("errorhandler"),
  static = require("serve-static"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  player = require("./controllers/player");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(morgan("dev"));
  app.use(errorhandler());
} else {
  app.use(morgan("combined"));
}

app.set("port", process.env.PORT || 3000);

app.set("permissions", {
  control: process.env.ENABLE_CONTROL==="true",
  status: process.env.ENABLE_STATUS==="true"
});

app.set("spotify.credentials", {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authToken: process.env.SPOTIFY_AUTH_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

app.use(bodyParser.json());
app.use(static("public/", {}));

app.use("/player/*", player.spotifyMiddleware);

app.get("/player/next", [player.controlMiddleware], player.nextTrack);
app.get("/player/prev", [player.controlMiddleware],player.previousTrack);
app.get("/player/status", [player.statusMiddleware], player.status);
app.put("/player/play", [player.controlMiddleware],player.play);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
