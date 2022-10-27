"use strict";
const path: String = require("path");
const WebIDL2JS: Array = require("webidl2js");

const dir: String = path.resolve(__dirname, "../lib");

const transformer: HTMLElement = new WebIDL2JS({ implSuffix: "-impl" });

transformer.addSource(dir, dir);
transformer.generate(dir)
  .catch((err: Object) => {
    console.error(err.stack);
    process.exit(1);
  });
