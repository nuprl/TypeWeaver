#!/usr/bin/env node

const rimraf: Function = require('./')

const path: string = require('path')

const isRoot: Function = (arg: string) => /^(\/|[a-zA-Z]:\\)$/.test(path.resolve(arg))
const filterOutRoot: Function = (arg: string) => {
  const ok: boolean = preserveRoot === false || !isRoot(arg)
  if (!ok) {
    console.error(`refusing to remove ${arg}`)
    console.error('Set --no-preserve-root to allow this')
  }
  return ok
}

let help: boolean = false
let dashdash: boolean = false
let noglob: boolean = false
let preserveRoot: boolean = true
const args: any[] = process.argv.slice(2).filter((arg: string) => {
  if (dashdash)
    return !!arg
  else if (arg === '--')
    dashdash = true
  else if (arg === '--no-glob' || arg === '-G')
    noglob = true
  else if (arg === '--glob' || arg === '-g')
    noglob = false
  else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
    help = true
  else if (arg === '--preserve-root')
    preserveRoot = true
  else if (arg === '--no-preserve-root')
    preserveRoot = false
  else
    return !!arg
}).filter((arg: string) => !preserveRoot || filterOutRoot(arg))

const go: Function = (n: number) => {
  if (n >= args.length)
    return
  const options: object = noglob ? { glob: false } : {}
  rimraf(args[n], options, (er: boolean) => {
    if (er)
      throw er
    go(n+1)
  })
}

if (help || args.length === 0) {
  // If they didn't ask for help, then this is not a "success"
  const log: object = help ? console.log : console.error
  log('Usage: rimraf <path> [<path> ...]')
  log('')
  log('  Deletes all files and folders at "path" recursively.')
  log('')
  log('Options:')
  log('')
  log('  -h, --help          Display this usage info')
  log('  -G, --no-glob       Do not expand glob patterns in arguments')
  log('  -g, --glob          Expand glob patterns in arguments (default)')
  log('  --preserve-root     Do not remove \'/\' (default)')
  log('  --no-preserve-root  Do not treat \'/\' specially')
  log('  --                  Stop parsing flags')
  process.exit(help ? 0 : 1)
} else
  go(0)
