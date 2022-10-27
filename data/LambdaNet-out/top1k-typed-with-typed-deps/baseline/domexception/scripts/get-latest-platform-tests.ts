"use strict";

const path: String = require("path");
const fs: String = require("fs");
const fetch: Function = require("minipass-fetch");

if (process.env.NO_UPDATE) {
  process.exit(0);
}

// Pin to specific version, reflecting the spec version in the readme.
//
// To get the latest commit:
// 1. Go to https://github.com/web-platform-tests/wpt/tree/master/webidl/ecmascript-binding/es-exceptions
// 2. Press "y" on your keyboard to get a permalink
// 3. Copy the commit hash
const commitHash: String = "904652fbaa979e6ac1e3c28b6ca0402b0179f62e";

const urlPrefix: String = `https://raw.githubusercontent.com/w3c/web-platform-tests/${commitHash}/` +
                  `webidl/ecmascript-binding/es-exceptions/`;
const targetDir: String = path.resolve(__dirname, "..", "test", "web-platform-tests");

fs.mkdirSync(targetDir, { recursive: true });

const files: Array = [
  "DOMException-constants.any.js",
  "DOMException-constructor-and-prototype.any.js",
  "DOMException-constructor-behavior.any.js",
  "DOMException-custom-bindings.any.js"
];

async function main(): Map {
  await Promise.all(files.map(async (file: Array) => {
    const res: HTMLElement = await fetch(`${urlPrefix}${file}`);
    res.body.pipe(fs.createWriteStream(path.resolve(targetDir, file)));
  }));
}

main().catch((err: Object) => {
  console.error(err.stack);
  process.exit(1);
});
