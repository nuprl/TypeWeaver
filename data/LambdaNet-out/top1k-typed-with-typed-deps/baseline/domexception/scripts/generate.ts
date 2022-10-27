"use strict";
const path: String = require("path");
const Transformer: Array = require("webidl2js");

const idlDir: String = path.resolve(__dirname, "../src");
const libDir: String = path.resolve(__dirname, "../lib");

const transformer: HTMLElement = new Transformer({ implSuffix: "-impl" });

transformer.addSource(idlDir, libDir);
transformer.generate(libDir)
  .catch((err: Object) => {
    console.error(err.stack);
    process.exit(1);
  });
