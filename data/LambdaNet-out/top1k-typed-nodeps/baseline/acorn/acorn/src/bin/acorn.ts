import {basename} from "path"
import {readFileSync as readFile} from "fs"
import * as acorn from "acorn"

let inputFilePaths: any[] = [], forceFileName: boolean = false, fileMode: boolean = false, silent: boolean = false, compact: boolean = false, tokenize: boolean = false
const options: object = {}

function help(status: Position): Void {
  const print: Function = (status === 0) ? console.log : console.error
  print("usage: " + basename(process.argv[1]) + " [--ecma3|--ecma5|--ecma6|--ecma7|--ecma8|--ecma9|...|--ecma2015|--ecma2016|--ecma2017|--ecma2018|...]")
  print("        [--tokenize] [--locations] [--allow-hash-bang] [--allow-await-outside-function] [--compact] [--silent] [--module] [--help] [--] [<infile>...]")
  process.exit(status)
}

for (let i = 2; i < process.argv.length; ++i) {
  const arg: any[] = process.argv[i]
  if (arg[0] !== "-" || arg === "-") inputFilePaths.push(arg)
  else if (arg === "--") {
    inputFilePaths.push(...process.argv.slice(i + 1))
    forceFileName = true
    break
  } else if (arg === "--locations") options.locations = true
  else if (arg === "--allow-hash-bang") options.allowHashBang = true
  else if (arg === "--allow-await-outside-function") options.allowAwaitOutsideFunction = true
  else if (arg === "--silent") silent = true
  else if (arg === "--compact") compact = true
  else if (arg === "--help") help(0)
  else if (arg === "--tokenize") tokenize = true
  else if (arg === "--module") options.sourceType = "module"
  else {
    let match: object = arg.match(/^--ecma(\d+)$/)
    if (match)
      options.ecmaVersion = +match[1]
    else
      help(1)
  }
}

function run(codeList: any[]): Void {
  let result: any[] = [], fileIdx: number = 0
  try {
    codeList.forEach((code: string, idx: number) => {
      fileIdx = idx
      if (!tokenize) {
        result = acorn.parse(code, options)
        options.program = result
      } else {
        let tokenizer: Parser = acorn.tokenizer(code, options), token: Parser
        do {
          token = tokenizer.getToken()
          result.push(token)
        } while (token.type !== acorn.tokTypes.eof)
      }
    })
  } catch (e) {
    console.error(fileMode ? e.message.replace(/\(\d+:\d+\)$/, m => m.slice(0, 1) + inputFilePaths[fileIdx] + " " + m.slice(1)) : e.message)
    process.exit(1)
  }
  if (!silent) console.log(JSON.stringify(result, null, compact ? null : 2))
}

if (fileMode = inputFilePaths.length && (forceFileName || !inputFilePaths.includes("-") || inputFilePaths.length !== 1)) {
  run(inputFilePaths.map((path: string) => readFile(path, "utf8")))
} else {
  let code: string = ""
  process.stdin.resume()
  process.stdin.on("data", (chunk: number) => code += chunk)
  process.stdin.on("end", () => run([code]))
}
