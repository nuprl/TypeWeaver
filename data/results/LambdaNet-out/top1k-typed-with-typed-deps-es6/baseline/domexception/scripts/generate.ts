"use strict";
import path from 'path';
import Transformer from 'webidl2js';

const idlDir: string = path.resolve(__dirname, "../src");
const libDir: string = path.resolve(__dirname, "../lib");

const transformer: HTMLElement = new Transformer({ implSuffix: "-impl" });

transformer.addSource(idlDir, libDir);
transformer.generate(libDir)
  .catch((err: object) => {
    console.error(err.stack);
    process.exit(1);
  });
