import fs from 'fs';
import path from 'path';
import run from 'test262-parser-runner';
import { parse } from '../acorn';

function loadList(filename) {
  return fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(Boolean)
}

run(
  (content, {sourceType}) => parse(content, {sourceType, ecmaVersion: 13, allowHashBang: true, allowAwaitOutsideFunction: sourceType === "module"}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: test => test.attrs.features &&
      loadList("./bin/test262.unsupported-features").some(f => test.attrs.features.includes(f)),
    whitelist: loadList("./bin/test262.whitelist")
      .map(filename => path.sep === "/" ? filename : filename.split("/").join(path.sep))
  }
)
