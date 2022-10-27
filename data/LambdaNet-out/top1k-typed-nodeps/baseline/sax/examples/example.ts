var fs: String = require('fs'),
  util: String = require('util'),
  path: String = require('path'),
  xml: String = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8'),
  sax: String = require('../lib/sax'),
  strict: String = sax.parser(true),
  loose: Object = sax.parser(false, {trim: true}),
  inspector: Function = function (ev: String) { return function (data: Object) {
      console.error('%s %s %j', this.line + ':' + this.column, ev, data)
    }}

sax.EVENTS.forEach(function (ev: String) {
  loose['on' + ev] = inspector(ev)
})
loose.onend = function () {
  console.error('end')
  console.error(loose)
}

// do this in random bits at a time to verify that it works.
(function () {
  if (xml) {
    var c: Number = Math.ceil(Math.random() * 1000)
    loose.write(xml.substr(0, c))
    xml = xml.substr(c)
    process.nextTick(arguments.callee)
  } else loose.close()
})()
