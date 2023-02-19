import m from './minimatch.js';
var pattern: RegExp = '**/*.js'
import expand from 'brace-expansion';
var files: string[] = expand('x/y/z/{1..1000}.js')
var start: any = process.hrtime()

for (var i = 0; i < 1000; i++) {
  for (var f = 0; f < files.length; f++) {
    var res: any = m(pattern, files[f])
  }
  if (!(i % 10)) process.stdout.write('.')
}
console.log('done')
var dur: any = process.hrtime(start)
console.log('%s ms', dur[0] * 1e3 + dur[1] / 1e6)
