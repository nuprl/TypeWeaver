"use strict"

import fs from 'fs';
import path from 'path';
import pkg from '../package.json';
const dependencies: any[] = Object.keys(pkg.devDependencies)
const unicodeVersion: string = dependencies.find((name: string) => /^@unicode\/unicode-\d/.test(name))

const start: any[] = require(unicodeVersion + "/Binary_Property/ID_Start/code-points.js").filter((ch: number) => ch > 0x7f)
let last: number = -1
const cont: any[] = [0x200c, 0x200d].concat(require(unicodeVersion + "/Binary_Property/ID_Continue/code-points.js")
  .filter((ch: number) => ch > 0x7f && search(start, ch, last + 1) === -1))

function search(arr: any[], ch: number, starting: number): number {
  for (let i = starting; arr[i] <= ch && i < arr.length; last = i++)
    if (arr[i] === ch) return i
  return -1
}

function esc(code: string): number {
  const hex: string = code.toString(16)
  return hex.length <= 2 ? "\\x" + hex.padStart(2, "0") : "\\u" + hex.padStart(4, "0")
}

function generate(chars: any[]): object {
  const astral: any[] = []
  let re: string = ""
  for (let i = 0, at = 0x10000; i < chars.length; i++) {
    let from: number = chars[i], to: number = from
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

const startData: object = generate(start), contData: object = generate(cont)

const astralIdentifierStartCodes: string = "export default " + JSON.stringify(startData.astral).split(",").join(", ")
const astralIdentifierCodes: string = "export default " + JSON.stringify(contData.astral).split(",").join(", ")
const nonASCIIidentifierStartChars: string = "export default \"" + startData.nonASCII + "\""
const nonASCIIidentifierChars: string = "export default \"" + contData.nonASCII + "\""

const comment: string = "// This file was generated. Do not modify manually!"

function writeGeneratedFile(filename: string, content: number): Void {
  fs.writeFileSync(path.resolve("./acorn/src/generated", filename + ".js"), comment + "\n" + content + "\n", "utf8")
}

writeGeneratedFile("astralIdentifierStartCodes", astralIdentifierStartCodes)
writeGeneratedFile("astralIdentifierCodes", astralIdentifierCodes)
writeGeneratedFile("nonASCIIidentifierStartChars", nonASCIIidentifierStartChars)
writeGeneratedFile("nonASCIIidentifierChars", nonASCIIidentifierChars)

console.log("Done. The generated files must be committed.")
