var m: Function = require('./minimatch.js')
var pattern: String = '**/*.js'
var expand: Function = require('brace-expansion')
var files: Array = expand('x/y/z/{1..1000}.js')
var start: Number = process.hrtime()

for (var i = 0; i < 1000; i++) {
  for (var f = 0; f < files.length; f++) {
    var res: Void = m(pattern, files[f])
  }
  if (!(i % 10)) process.stdout.write('.')
}
console.log('done')
var dur: Object = process.hrtime(start)
console.log('%s ms', dur[0] * 1e3 + dur[1] / 1e6)
