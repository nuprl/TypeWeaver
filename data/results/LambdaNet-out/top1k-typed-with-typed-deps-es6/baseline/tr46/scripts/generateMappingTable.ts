"use strict";

import fs from 'fs';
import path from 'path';
import fetch from 'minipass-fetch';
import { unicodeVersion } from '../package.json';
import { STATUS_MAPPING } from '../lib/statusMapping.js';

async function main(): Map {
  const response: Element = await fetch(`https://unicode.org/Public/idna/${unicodeVersion}/IdnaMappingTable.txt`);
  const body: string = await response.text();

  const lines: any[] = [];

  body.split("\n").forEach((l: string) => {
    l = l.split("#")[0]; // Remove comments
    const cells: any[] = l.split(";").map((c: string) => {
      return c.trim();
    });
    if (cells.length === 1) {
      return;
    }

    // Parse ranges to int[2] array
    const range: object = cells[0].split("..");
    const start: number = parseInt(range[0], 16);
    const end: number = parseInt(range[1] || range[0], 16);
    cells[0] = end === start ? start : [start, end];

    cells[1] = STATUS_MAPPING[cells[1]];

    if (cells[1] === STATUS_MAPPING.valid) {
      lines.push(cells.slice(0, 2));
      return;
    }

    if (cells[2] !== undefined) {
      // Parse replacement to int[] array
      let replacement: any[] = cells[2].split(" ");
      if (replacement[0] === "") { // Empty array
        replacement = [];
      }

      replacement = replacement.map((r: number) => {
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
