const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: Object.fromEntries(glob.sync("./src/client/js/*.js").map(a=>[path.basename(a),a])),
    mode: "development",
    watch: true,
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/styles.css",
      }),
    ],
    output: {
      filename: "js/[name]",
      path: path.resolve(__dirname, "assets"),
      clean: false,
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [["@babel/preset-env", { targets: "defaults" }]],
              },
            },
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        ],
      },
  };
  