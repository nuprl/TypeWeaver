"use strict";

const webpack: String = require("webpack");

module.exports = function (config: Map) {
  config.set({
    basePath: "",
    files: ["./test/browser.js"],

    preprocessors: {
      "test/browser.js": ["webpack"]
    },

    webpack: {
      mode: "development",
      plugins: [
        new webpack.ProvidePlugin({
          process: "process"
        })
      ]
    },

    frameworks: ["mocha", "webpack"],

    reporters: ["dots"],

    browsers: ["Firefox"],
    singleRun: true
  });
};
