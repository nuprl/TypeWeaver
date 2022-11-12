// pull out /GeneralSearchResponse/categories/category/items/product tags
// the rest we don't care about.

import sax from '../lib/sax.js';

import fs from 'fs';
import path from 'path';
var xmlFile: String = path.resolve(__dirname, 'shopping.xml')
import util from 'util';
import http from 'http';

fs.readFile(xmlFile, function (er: Boolean, d: String) {
  http.createServer(function (req: Function, res: Array) {
    if (er) throw er
    var xmlstr: String = d.toString('utf8')

    var parser: HTMLElement = sax.parser(true)
    var products: Array = []
    var product: String = null
    var currentTag: Object = null

    parser.onclosetag = function (tagName: String) {
      if (tagName === 'product') {
        products.push(product)
        currentTag = product = null
        return
      }
      if (currentTag && currentTag.parent) {
        var p: HTMLElement = currentTag.parent
        delete currentTag.parent
        currentTag = p
      }
    }

    parser.onopentag = function (tag: Object) {
      if (tag.name !== 'product' && !product) return
      if (tag.name === 'product') {
        product = tag
      }
      tag.parent = currentTag
      tag.children = []
      tag.parent && tag.parent.children.push(tag)
      currentTag = tag
    }

    parser.ontext = function (text: String) {
      if (currentTag) currentTag.children.push(text)
    }

    parser.onend = function () {
      var out: Array = util.inspect(products, false, 3, true)
      res.writeHead(200, {'content-type': 'application/json'})
      res.end('{"ok":true}')
    // res.end(JSON.stringify(products))
    }

    parser.write(xmlstr).end()
  }).listen(1337)
})
