// pull out /GeneralSearchResponse/categories/category/items/product tags
// the rest we don't care about.

var sax = require('../lib/sax.js')
var fs = require('fs')
var path = require('path')
var xmlFile = path.resolve(__dirname, 'shopping.xml')
var util = require('util')
var http = require('http')

fs.readFile(xmlFile, function (er: Error,  d: any) {
  http.createServer(function (req: Request,  res: Response) {
    if (er) throw er
    var xmlstr = d.toString('utf8')

    var parser = sax.parser(true)
    var products = []
    var product = null
    var currentTag = null

    parser.onclosetag = function (tagName: any) {
      if (tagName === 'product') {
        products.push(product)
        currentTag = product = null
        return
      }
      if (currentTag && currentTag.parent) {
        var p = currentTag.parent
        delete currentTag.parent
        currentTag = p
      }
    }

    parser.onopentag = function (tag: g) {
      if (tag.name !== 'product' && !product) return
      if (tag.name === 'product') {
        product = tag
      }
      tag.parent = currentTag
      tag.children = []
      tag.parent && tag.parent.children.push(tag)
      currentTag = tag
    }

    parser.ontext = function (text: Text) {
      if (currentTag) currentTag.children.push(text)
    }

    parser.onend = function () {
      var out = util.inspect(products, false, 3, true)
      res.writeHead(200, {'content-type': 'application/json'})
      res.end('{"ok":true}')
    // res.end(JSON.stringify(products))
    }

    parser.write(xmlstr).end()
  }).listen(1337)
})