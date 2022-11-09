#!/usr/bin/env node
import rimraf from './';
import path from 'path';

const isRoot: Function = (arg: String) => /^(\/|[a-zA-Z]:\\)$/.test(path.resolve(arg))
const filterOutRoot: Function = (arg: String) => {
  const ok: Boolean = preserveRoot === false || !isRoot(arg)
  if (!ok) {
    console.error(`refusing to remove ${arg}`)
    console.error('Set --no-preserve-root to allow this')
  }
  return ok
}

let help: Boolean = false
let dashdash: Boolean = false
let noglob: Boolean = false
let preserveRoot: Boolean = true
const args: Array = process.argv.slice(2).filter((arg: Number) => {
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
}).filter((arg: String) => !preserveRoot || filterOutRoot(arg))

const go: Function = (n: Number) => {
  if (n >= args.length)
    return
  const options: Object = noglob ? { glob: false } : {}
  rimraf(args[n], options, (er: Boolean) => {
    if (er)
      throw er
    go(n+1)
  })
}

if (help || args.length === 0) {
  // If they didn't ask for help, then this is not a "success"
  const log: Object = help ? console.log : console.error
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
