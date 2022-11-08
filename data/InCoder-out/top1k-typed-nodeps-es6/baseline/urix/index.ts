// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

"use strict"

import path from 'path';

function urix(aPath: string | undefined) {
  if (path.sep === "\\") {
    return aPath
      .replace(/\\/g, "/")
      .replace(/^[a-z]:\/?/i, "/")
  }
  return aPath
}

export default urix;