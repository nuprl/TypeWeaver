var fs: any = require('fs'),
  util = require('util'),
  path = require('path'),
  xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8'),
  sax = require('../lib/sax'),
  strict = sax.parser(true),
  loose = sax.parser(false, {trim: true}),
  inspector = function (ev: any) { return function (data: any) {
      console.error('%s %s %j', this.line + ':' + this.column, ev, data)
    }}

sax.EVENTS.forEach(function (ev: any) {
  loose['on' + ev] = inspector(ev)
})
loose.onend = function () {
  console.error('end')
  console.error(loose)
}

// do this in random bits at a time to verify that it works.
(function () {
  if (xml) {
    var c: number = Math.ceil(Math.random() * 1000)
    loose.write(xml.substr(0, c))
    xml = xml.substr(c)
    process.nextTick(arguments.callee)
  } else loose.close()
})()