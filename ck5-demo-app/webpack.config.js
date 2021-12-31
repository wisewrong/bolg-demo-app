// webpack.config.js
"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const port = 8100;

module.exports = {
  entry: "./example/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  performance: { hints: false },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    host: 'localhost',
    port: port,
    publicPath: '/',
    after (app) {
      console.log(`Your application is running here: http://localhost:${port}`)
    },
    quiet: true // necessary for FriendlyErrorsPlugin
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["raw-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
              attributes: {
                "data-cke": true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Example",
      template: "example/index.html",
    }),
  ],
  resolve: {
    alias: {
      "@plugin": path.resolve("/packages"),
    },
  }
};
