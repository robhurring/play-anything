const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public/assets",
    filename: "bundle.js",
    publicPath: "assets/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css/,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      watch: [".", "./public/assets"],
      script: "./server.js"
    })
  ]
};
