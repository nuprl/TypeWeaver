const { copyFileSync } = require("fs");
const { join } = require("path");

const src: string = join(__dirname, "src", "index.js");
const target: string = join(__dirname, "lib", "index.mjs");
copyFileSync(src, target);
