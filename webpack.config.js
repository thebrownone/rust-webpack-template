const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",  // Set to "development" for development builds
  entry: {
    index: "./js/index.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    static: {
      directory: dist,  // Correct replacement for contentBase
    },
    open: true,  // Automatically open the browser when the server starts
    compress: true,  // Enable gzip compression
    port: 8080,  // Port to run the server
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "static"), to: dist }
      ],
    }),

    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname),
    }),
  ],
  // Enable WebAssembly support
  experiments: {
    asyncWebAssembly: true,  // Enable async WebAssembly
  },
};
