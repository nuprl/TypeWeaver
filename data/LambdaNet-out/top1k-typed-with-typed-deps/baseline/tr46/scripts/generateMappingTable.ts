"use strict";

const fs: String = require("fs");
const path: String = require("path");
const fetch: Function = require("minipass-fetch");
const { unicodeVersion } = require("../package.json");
const { STATUS_MAPPING } = require("../lib/statusMapping.js");

async function main(): Map {
  const response: Element = await fetch(`https://unicode.org/Public/idna/${unicodeVersion}/IdnaMappingTable.txt`);
  const body: String = await response.text();

  const lines: Array = [];

  body.split("\n").forEach((l: String) => {
    l = l.split("#")[0]; // Remove comments
    const cells: Array = l.split(";").map((c: String) => {
      return c.trim();
    });
    if (cells.length === 1) {
      return;
    }

    // Parse ranges to int[2] array
    const range: Object = cells[0].split("..");
    const start: Number = parseInt(range[0], 16);
    const end: Number = parseInt(range[1] || range[0], 16);
    cells[0] = end === start ? start : [start, end];

    cells[1] = STATUS_MAPPING[cells[1]];

    if (cells[1] === STATUS_MAPPING.valid) {
      lines.push(cells.slice(0, 2));
      return;
    }

    if (cells[2] !== undefined) {
      // Parse replacement to int[] array
      let replacement: Array = cells[2].split(" ");
      if (replacement[0] === "") { // Empty array
        replacement = [];
      }

      replacement = replacement.map((r: Number) => {
        return parseInt(r, 16);
      });

      cells[2] = String.fromCodePoint(...replacement);
    }

    lines.push(cells);
  });

  // We could drop valid chars, but those are only ~1000 ranges and
  // binary search is way to quick to even notice that

  fs.writeFileSync(path.resolve(__dirname, "../lib/mappingTable.json"), JSON.stringify(lines));
}

main();
