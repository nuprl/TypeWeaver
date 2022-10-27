"use strict"

const fs: String = require("fs")
const path: String = require("path")
const pkg: Array = require("../package.json")
const dependencies: Array = Object.keys(pkg.devDependencies)
const unicodeVersion: String = dependencies.find((name: String) => /^@unicode\/unicode-\d/.test(name))

const start: Array = require(unicodeVersion + "/Binary_Property/ID_Start/code-points.js").filter((ch: Number) => ch > 0x7f)
let last: Number = -1
const cont: Array = [0x200c, 0x200d].concat(require(unicodeVersion + "/Binary_Property/ID_Continue/code-points.js")
  .filter((ch: Number) => ch > 0x7f && search(start, ch, last + 1) === -1))

function search(arr: Array, ch: Number, starting: Number): Number {
  for (let i = starting; arr[i] <= ch && i < arr.length; last = i++)
    if (arr[i] === ch) return i
  return -1
}

function esc(code: String): Number {
  const hex: String = code.toString(16)
  return hex.length <= 2 ? "\\x" + hex.padStart(2, "0") : "\\u" + hex.padStart(4, "0")
}

function generate(chars: Array): Object {
  const astral: Array = []
  let re: String = ""
  for (let i = 0, at = 0x10000; i < chars.length; i++) {
    let from: Number = chars[i], to: Number = from
    while (i < chars.length - 1 && chars[i + 1] === to + 1) { i++; to++ }
    if (to <= 0xffff) {
      if (from === to) re += esc(from)
      else if (from + 1 === to) re += esc(from) + esc(to)
      else re += esc(from) + "-" + esc(to)
    } else {
      astral.push(from - at, to - from)
      at = to
    }
  }
  return {nonASCII: re, astral: astral}
}

const startData: Object = generate(start), contData: Object = generate(cont)

const astralIdentifierStartCodes: String = "export default " + JSON.stringify(startData.astral).split(",").join(", ")
const astralIdentifierCodes: String = "export default " + JSON.stringify(contData.astral).split(",").join(", ")
const nonASCIIidentifierStartChars: String = "export default \"" + startData.nonASCII + "\""
const nonASCIIidentifierChars: String = "export default \"" + contData.nonASCII + "\""

const comment: String = "// This file was generated. Do not modify manually!"

function writeGeneratedFile(filename: String, content: String): Void {
  fs.writeFileSync(path.resolve("./acorn/src/generated", filename + ".js"), comment + "\n" + content + "\n", "utf8")
}

writeGeneratedFile("astralIdentifierStartCodes", astralIdentifierStartCodes)
writeGeneratedFile("astralIdentifierCodes", astralIdentifierCodes)
writeGeneratedFile("nonASCIIidentifierStartChars", nonASCIIidentifierStartChars)
writeGeneratedFile("nonASCIIidentifierChars", nonASCIIidentifierChars)

console.log("Done. The generated files must be committed.")
