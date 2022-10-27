const { copyFileSync } = require("fs");
const { join } = require("path");

const src: String = join(__dirname, "src", "index.js");
const target: String = join(__dirname, "lib", "index.mjs");
copyFileSync(src, target);
