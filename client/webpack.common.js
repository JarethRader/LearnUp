const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: [
          {
            //needed to chain sourcemaps.  see: https://webpack.js.org/loaders/source-map-loader/
            loader: "source-map-loader",
            options: {
              filterSourceMappingUrl: (url, resourcePath) => {
                //  console.log({ url, resourcePath }) example:
                // {
                //  url: 'index.js.map',
                //  resourcePath: '/repos/xlib-wsl/common/temp/node_modules/.pnpm/https-proxy-agent@5.0.0/node_modules/https-proxy-agent/dist/index.js'
                // }
                if (/.*\/node_modules\/.*/.test(resourcePath)) {
                  return false;
                }
                return true;
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "static/resources/[name].[ext]",
        },
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: { alias: { "react-dom": "@hot-loader/react-dom" } },
    }),
    new WebpackBar(),
    // process.env.NODE_ENV === 'analyze' && new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_USER_BASE_URL': JSON.stringify(process.env.REACT_APP_USER_BASE_URL),
      'process.env.REACT_APP_WHITEBOARD_BASE_URL': JSON.stringify(process.env.REACT_APP_WHITEBOARD_BASE_URL),
      'process.env.REACT_APP_AUDIO_BASE_URL': JSON.stringify(process.env.REACT_APP_AUDIO_BASE_URL),
    }),
  ],
};