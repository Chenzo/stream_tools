const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', "./src/index.js"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|mp4|webm)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[hash].[ext]",
            },
          },
        ],
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Images: path.resolve(__dirname, 'images/')
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "./",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //title: 'Output Management',
      template: 'public/index.html'
    }),
    new CopyPlugin([
      /* { from: 'public/data', to: 'data' }, */
      { from: 'public/css', to: 'css' },
      { from: 'public/fonts', to: 'fonts' },
      { from: 'public/images', to: 'images' },
      { from: 'public/video', to: 'video' },
      { from: 'public/js', to: 'js' },
      { from: 'public/manifest.json', to: 'manifest.json' },
      { from: 'public/service-worker.js', to: 'service-worker.js' }
    ])
  ]
};