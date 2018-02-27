const express = require("express"),
  http = require("http"),
  errorhandler = require("errorhandler"),
  static = require("serve-static"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  session = require('express-session'),
  db = require("./lib/db"),
  spotify = require("./controllers/spotify"),
  stats = require("./controllers/stats");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(morgan("dev"));
  app.use(errorhandler());
} else {
  app.use(morgan("combined"));
}

app.set("port", process.env.PORT || 3000);

app.set("db", db.createDb(process.env.REDIS_URL));

app.set("permissions", {
  control: process.env.ENABLE_CONTROL === "true",
  status: process.env.ENABLE_STATUS === "true"
});

app.set("spotify.credentials", {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authToken: process.env.SPOTIFY_AUTH_TOKEN,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(bodyParser.json());
app.use(static("public/", {}));

const permMiddleware = permission => {
  return (req, res, next) => {
    const perms = req.app.get("permissions");

    if (!perms[permission]) {
      return res.status(400).json({
        error: permission + " disabled"
      });
    }
    next();
  };
};

app.use("*", (req, res, next) => {
  const db = req.app.get("db");
  const id = req.session.id;

  db.addClient(id);
  next();
});

app.use("/player/*", spotify.apiMiddleware);
app.get("/player/status", [permMiddleware("status")], spotify.status);
app.put("/player/play", [permMiddleware("control")], spotify.play);

app.get("/stats", stats.stats);

http.createServer(app).listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});
