"use strict";
/* eslint-disable no-process-env, no-process-exit */

if (process.env.NO_UPDATE) {
  process.exit(0);
}

const fs: string = require("fs");
const path: string = require("path");
const { promisify } = require("util");
// Replace this with stream/promises.pipeline when we require Node.js 15.x.
const { pipeline } = require("stream");
const fetch: Function = require("minipass-fetch");
const { unicodeVersion } = require("../package.json");

const pipelinePromise: Function = promisify(pipeline);

async function main(): Map {
  await Promise.all([
    (async () => {
      const target: string = fs.createWriteStream(path.resolve(__dirname, "../test/fixtures/IdnaTestV2.txt"));
      const response: HTMLElement = await fetch(`https://unicode.org/Public/idna/${unicodeVersion}/IdnaTestV2.txt`);
      await pipelinePromise(response.body, target);
    })(),
    (async () => {
      const asciiTarget: string = fs.createWriteStream(path.resolve(__dirname, "../test/fixtures/toascii.json"));
      const response: HTMLElement = await fetch("https://github.com/web-platform-tests/wpt/raw/112ad5ca55d55f6da2ccc7468e6dcc91b4e5d223/url/resources/toascii.json");
      await pipelinePromise(response.body, asciiTarget);
    })()
  ]);
}

main();
