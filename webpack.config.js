const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node-modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/todoList.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: true,
    }),
  ],
  devServer: {
    contentBase: __dirname + "/dist",
  },
};
