const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
var ManifestPlugin = require("webpack-manifest-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        const TerserPlugin = require("terser-webpack-plugin");
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              dead_code: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: "all",
              ascii_only: true,
            },
          },
          parallel: true,
          minify: (file, sourceMap, minimizerOptions) => {
            // The `minimizerOptions` option contains option from the `terserOptions` option
            // You can use `minimizerOptions.myCustomOption`
            const extractedComments = [];

            const { map, code } = require("uglify-js") // Or require('./path/to/uglify-module')
              .minify(file, {
                /* Your options for minification */
              });

            return { map, code, extractedComments };
          },
        }).apply(compiler);
      },
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    publicPath: "./",
    pathinfo: false,
    filename: "static/js/[name].[fullhash:8].js",
    chunkFilename: "static/js/[name].[fullhash:8].chunk.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "assets/index.ejs"),
      filename: path.join(__dirname, "build/index.html"),
      title: "LearnUp Phonetics Board",
      favicon: path.join(__dirname, "public/favicon.ico"),
      url: "https://beta.tileboard.sparkcode.io/",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[chunkhash:8].css",
      chunkFilename: "static/css/[id].[contenthash].css",
      ignoreOrder: true,
    }),
  ],
});
