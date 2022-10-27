var fs: String = require('fs')
var path: String = require('path')
var spawn: Function = require('child_process').spawn

var exe: String = process.argv[0]
var cwd: String = process.cwd()

for (var dep in process.versions) {
  console.log('  %s@%s', dep, process.versions[dep])
}

console.log('')

runScripts(fs.readdirSync(__dirname))

function runScripts (fileNames: Array): String {
  var fileName: String = fileNames.shift()

  if (!fileName) return
  if (!/\.js$/i.test(fileName)) return runScripts(fileNames)
  if (fileName.toLowerCase() === 'index.js') return runScripts(fileNames)

  var fullPath: String = path.join(__dirname, fileName)

  console.log('> %s %s', exe, path.relative(cwd, fullPath))

  var proc: Object = spawn(exe, [fullPath], {
    'stdio': 'inherit'
  })

  proc.on('exit', function () {
    runScripts(fileNames)
  })
}
