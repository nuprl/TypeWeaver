// pull out /GeneralSearchResponse/categories/category/items/product tags
// the rest we don't care about.

var sax: any = require('../lib/sax.js')
var fs: any = require('fs')
var path: any = require('path')
var xmlFile: any = path.resolve(__dirname, 'shopping.xml')
var util: any = require('util')
var http: any = require('http')

fs.readFile(xmlFile, function (er: any, d: any) {
  http.createServer(function (req: any, res: any) {
    if (er) throw er
    var xmlstr: any = d.toString('utf8')

    var parser: any = sax.parser(true)
    var products: any[] = []
    var product: any = null
    var currentTag: any = null

    parser.onclosetag = function (tagName: any) {
      if (tagName === 'product') {
        products.push(product)
        currentTag = product = null
        return
      }
      if (currentTag && currentTag.parent) {
        var p: any = currentTag.parent
        delete currentTag.parent
        currentTag = p
      }
    }

    parser.onopentag = function (tag: any) {
      if (tag.name !== 'product' && !product) return
      if (tag.name === 'product') {
        product = tag
      }
      tag.parent = currentTag
      tag.children = []
      tag.parent && tag.parent.children.push(tag)
      currentTag = tag
    }

    parser.ontext = function (text: any) {
      if (currentTag) currentTag.children.push(text)
    }

    parser.onend = function () {
      var out: any = util.inspect(products, false, 3, true)
      res.writeHead(200, {'content-type': 'application/json'})
      res.end('{"ok":true}')
    // res.end(JSON.stringify(products))
    }

    parser.write(xmlstr).end()
  }).listen(1337)
})
