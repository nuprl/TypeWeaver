// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

"use strict"

var path: String = require("path")

function urix(aPath: String): String {
  if (path.sep === "\\") {
    return aPath
      .replace(/\\/g, "/")
      .replace(/^[a-z]:\/?/i, "/")
  }
  return aPath
}

module.exports = urix