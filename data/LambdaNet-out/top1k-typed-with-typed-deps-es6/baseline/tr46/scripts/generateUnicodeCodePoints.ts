"use strict";
import fs from 'fs';

if (process.argv.length < 3) {
  /* eslint-disable no-console */
  console.error("Usage: node generateUnicodeCodePoints.js filename [categories...]");
  console.error("Convert a derived Unicode Character Database file to a JSON map.");
  /* eslint-enable no-console */
  return;
}

const sourceFile: string = process.argv[2];
const interestedValues: Error = new Set(process.argv.slice(3));

const source: string = fs.readFileSync(sourceFile, "utf8");
const lines: any[] = source.split("\n");

const map: object = {};

for (const line of lines) {
  if (/^#/u.test(line) || !/;\x20/u.test(line)) {
    continue;
  }
  const data: object = line.trim().split(";");
  const category: string = data[1].split("#")[0].trim();
  const [begin, end = begin] = data[0].trim().split("..").map((str: string) => parseInt(str, 16));

  for (const i of range(begin, end)) {
    if (!map[category]) {
      if (interestedValues.size === 0 || interestedValues.has(category)) {
        map[category] = [];
      } else {
        continue;
      }
    }
    map[category].push(i);
  }
}

process.stdout.write(JSON.stringify(map));
process.stdout.write("\n");

function* range(begin: number, end: number): string {
  for (let i = begin; i <= end; i++) {
    yield i;
  }
}
