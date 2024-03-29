"use strict";

if (process.env.NO_UPDATE) {
  process.exit(0);
}

import fs from 'fs';
import path from 'path';
import util from 'util';
import stream from 'stream';
import got from 'got';

const pipeline: Function = util.promisify(stream.pipeline);

process.on("unhandledRejection", (err: Function) => {
  throw err;
});

// Pin to specific version, reflecting the spec version in the readme.
//
// To get the latest commit:
// 1. Go to https://github.com/web-platform-tests/wpt/tree/master/url
// 2. Press "y" on your keyboard to get a permalink
// 3. Copy the commit hash
const commitHash: string = "681773c2a927f936b71b4163469942080fbd5fab";

const urlPrefix: string = `https://raw.githubusercontent.com/web-platform-tests/wpt/${commitHash}/url/`;
const targetDir: string = path.resolve(__dirname, "..", "test", "web-platform-tests");

(fs.rmSync || fs.rmdirSync)(targetDir, { recursive: true, force: true });
fs.mkdirSync(path.resolve(targetDir, "resources"), { recursive: true });

for (const file of [
  "resources/percent-encoding.json",
  "resources/setters_tests.json",
  "resources/toascii.json",
  "resources/urltestdata.json",
  "url-searchparams.any.js",
  "url-setters-stripping.any.js",
  "url-tojson.any.js",
  "urlencoded-parser.any.js",
  "urlsearchparams-append.any.js",
  "urlsearchparams-constructor.any.js",
  "urlsearchparams-delete.any.js",
  "urlsearchparams-foreach.any.js",
  "urlsearchparams-getall.any.js",
  "urlsearchparams-get.any.js",
  "urlsearchparams-has.any.js",
  "urlsearchparams-set.any.js",
  "urlsearchparams-sort.any.js",
  "urlsearchparams-stringifier.any.js"
]) {
  pipeline(
    got.stream(`${urlPrefix}${file}`),
    fs.createWriteStream(path.resolve(targetDir, file))
  );
}
