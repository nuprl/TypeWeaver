const fs: String = require("fs")
const path: String = require("path")
const run: Function = require("test262-parser-runner")
const parse: String = require("../acorn").parse

function loadList(filename: String): Array {
  return fs.readFileSync(filename, "utf8")
    .split("\n")
    .filter(Boolean)
}

run(
  (content: Function, {sourceType}) => parse(content, {sourceType, ecmaVersion: 13, allowHashBang: true, allowAwaitOutsideFunction: sourceType === "module"}),
  {
    testsDirectory: path.dirname(require.resolve("test262/package.json")),
    skip: (test: Parser) => test.attrs.features &&
      loadList("./bin/test262.unsupported-features").some((f: Number) => test.attrs.features.includes(f)),
    whitelist: loadList("./bin/test262.whitelist")
      .map((filename: String) => path.sep === "/" ? filename : filename.split("/").join(path.sep))
  }
)
