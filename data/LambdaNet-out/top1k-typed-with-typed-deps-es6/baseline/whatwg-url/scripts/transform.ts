"use strict";
import path from 'path';
import WebIDL2JS from 'webidl2js';

const dir: String = path.resolve(__dirname, "../lib");

const transformer: HTMLElement = new WebIDL2JS({ implSuffix: "-impl" });

transformer.addSource(dir, dir);
transformer.generate(dir)
  .catch((err: Object) => {
    console.error(err.stack);
    process.exit(1);
  });
