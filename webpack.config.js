const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require('dotenv').config();
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000'
          : '/api'
      )
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public/manifest.json"), to: "manifest.json" },
        { from: path.resolve(__dirname, "public/icon192.png"), to: "icon192.png" },
        { from: path.resolve(__dirname, "public/icon512.png"), to: "icon512.png" }
      ]
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  ]
  }
};
