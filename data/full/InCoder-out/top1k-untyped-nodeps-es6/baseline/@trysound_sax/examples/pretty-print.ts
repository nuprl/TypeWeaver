import sax from '../lib/sax';
import fs from 'fs';
var printer = sax.createStream(false, {lowercasetags: true, trim: true});

function entity (str: String) {
  return str.replace('"', '&quot;')
}

printer.tabstop = 2
printer.level = 0
printer.indent = function () {
  print('\n')
  for (var i = this.level; i > 0; i--) {
    for (var j = this.tabstop; j > 0; j--) {
      print(' ')
    }
  }
}
printer.on('opentag', function (tag: Tag) {
  this.indent()
  this.level++
  print('<' + tag.name)
  for (var i in tag.attributes) {
    print(' ' + i + '="' + entity(tag.attributes[i]) + '"')
  }
  print('>')
})

printer.on('text', ontext)
printer.on('doctype', ontext)
function ontext (text: String) {
  this.indent()
  print(text)
}

printer.on('closetag', function (tag: Tag) {
  this.level--
  this.indent()
  print('</' + tag + '>')
})

printer.on('cdata', function (data: any) {
  this.indent()
  print('<![CDATA[' + data + ']]>')
})

printer.on('comment', function (comment: Comment) {
  this.indent()
  print('<!--' + comment + '-->')
})

printer.on('error', function (error: Error) {
  console.error(error)
  throw error
})

if (!process.argv[2]) {
  throw new Error('Please provide an xml file to prettify\n' +
    'TODO: read from stdin or take a file')
}
var xmlfile = require('path').join(process.cwd(), process.argv[2])
var fstr = fs.createReadStream(xmlfile, { encoding: 'utf8' })

function print (c: string | Buffer) {
  if (!process.stdout.write(c)) {
    fstr.pause()
  }
}

process.stdout.on('drain', function () {
  fstr.resume()
})

fstr.pipe(printer)