"use strict";
import path from 'path';
import Transformer from 'webidl2js';

const idlDir = path.resolve(__dirname, "../src");
const libDir = path.resolve(__dirname, "../lib");

const transformer = new Transformer({ implSuffix: "-impl" });

transformer.addSource(idlDir, libDir);
transformer.generate(libDir)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });