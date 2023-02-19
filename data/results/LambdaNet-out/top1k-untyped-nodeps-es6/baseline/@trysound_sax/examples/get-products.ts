// pull out /GeneralSearchResponse/categories/category/items/product tags
// the rest we don't care about.

import sax from '../lib/sax.js';

import fs from 'fs';
import path from 'path';
var xmlFile: string = path.resolve(__dirname, 'shopping.xml')
import util from 'util';
import http from 'http';

fs.readFile(xmlFile, function (er: boolean, d: number) {
  http.createServer(function (req: Function, res: any[]) {
    if (er) throw er
    var xmlstr: string = d.toString('utf8')

    var parser: HTMLElement = sax.parser(true)
    var products: any[] = []
    var product: string = null
    var currentTag: object = null

    parser.onclosetag = function (tagName: string) {
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

    parser.onopentag = function (tag: object) {
      if (tag.name !== 'product' && !product) return
      if (tag.name === 'product') {
        product = tag
      }
      tag.parent = currentTag
      tag.children = []
      tag.parent && tag.parent.children.push(tag)
      currentTag = tag
    }

    parser.ontext = function (text: string) {
      if (currentTag) currentTag.children.push(text)
    }

    parser.onend = function () {
      var out: string = util.inspect(products, false, 3, true)
      res.writeHead(200, {'content-type': 'application/json'})
      res.end('{"ok":true}')
    // res.end(JSON.stringify(products))
    }

    parser.write(xmlstr).end()
  }).listen(1337)
})
