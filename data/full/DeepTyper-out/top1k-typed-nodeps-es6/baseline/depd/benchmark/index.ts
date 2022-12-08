import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

var exe: any = process.argv[0]
var cwd: any = process.cwd()

runScripts(fs.readdirSync(__dirname))

function runScripts (fileNames: any): any {
  var fileName: string = fileNames.shift()

  if (!fileName) return
  if (!/\.js$/i.test(fileName)) return runScripts(fileNames)
  if (fileName.toLowerCase() === 'index.js') return runScripts(fileNames)

  var fullPath: any = path.join(__dirname, fileName)

  console.log('> %s %s', exe, path.relative(cwd, fullPath))

  var proc: any = spawn(exe, [fullPath], {
    stdio: 'inherit'
  })

  proc.on('exit', function () {
    runScripts(fileNames)
  })
}
