const path = require("path");
const webpack = require("webpack");

const envvars = new webpack.EnvironmentPlugin(["NODE_ENV", "TARGET"]);

const extractCommonChunks = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity
});

module.exports = {
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  entry: {
    head: "./src/js/head.js",
    app: "./src/js/app.js",
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env", "babel-preset-react", "babel-preset-stage-0"]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/dist"
            }
          }
        ]
      },
    ]
  },
  plugins: [envvars, extractCommonChunks]
};
