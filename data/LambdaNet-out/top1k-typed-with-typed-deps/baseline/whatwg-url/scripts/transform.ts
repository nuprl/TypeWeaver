"use strict";
const path: string = require("path");
const WebIDL2JS: any[] = require("webidl2js");

const dir: string = path.resolve(__dirname, "../lib");

const transformer: HTMLElement = new WebIDL2JS({ implSuffix: "-impl" });

transformer.addSource(dir, dir);
transformer.generate(dir)
  .catch((err: object) => {
    console.error(err.stack);
    process.exit(1);
  });
