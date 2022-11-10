"use strict";

import webpack from 'webpack';

export default function (config: Config) {
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