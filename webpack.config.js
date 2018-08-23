const path = require("path");

module.exports = {
  entry: ["./src/app.js"],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};
