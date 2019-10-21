var path = require("path");
var webpack = require("webpack");

const { CleanWebpackPlugin }  = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "app.bundle": "./src/main.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: "babel-loader"
      },
      {
        test: /phaser-split\.js$/,
        loader: "raw-loader"
      },
      {
        test: [/\.vert$/, /\.frag$/],
        loader: "raw-loader"
      }
    ]
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    inline: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
      CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyPlugin([
      { from: 'assets', to: 'assets' }
    ]),
  ]
};
