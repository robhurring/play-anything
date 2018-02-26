var http = require("http");
var express = require("express");
var errorhandler = require("errorhandler");
var static = require("serve-static");
var morgan = require("morgan");
var app = express();

app.set("port", process.env.PORT || 3000);

app.use(
  static("public/", {
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(errorhandler());
} else {
  app.use(morgan("combined"));
}

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
