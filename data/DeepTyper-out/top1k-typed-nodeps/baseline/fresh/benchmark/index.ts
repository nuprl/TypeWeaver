var fs: any = require('fs')
var path: any = require('path')
var spawn: any = require('child_process').spawn

var exe: any = process.argv[0]
var cwd: any = process.cwd()

for (var dep in process.versions) {
  console.log('  %s@%s', dep, process.versions[dep])
}

console.log('')

runScripts(fs.readdirSync(__dirname))

function runScripts (fileNames: any): string {
  var fileName: string = fileNames.shift()

  if (!fileName) return
  if (!/\.js$/i.test(fileName)) return runScripts(fileNames)
  if (fileName.toLowerCase() === 'index.js') return runScripts(fileNames)

  var fullPath: any = path.join(__dirname, fileName)

  console.log('> %s %s', exe, path.relative(cwd, fullPath))

  var proc: any = spawn(exe, [fullPath], {
    'stdio': 'inherit'
  })

  proc.on('exit', function () {
    runScripts(fileNames)
  })
}
