'use strict'

import path from 'path';
import write from './lib/write';

// all codes
var codes = {}

// initialize with all IANA codes
addData(codes, require('../src/iana.json'))

// add the codes from node
addData(codes, require('../src/node.json'))

// add the codes from nginx
addData(codes, require('../src/nginx.json'))

// add the codes from apache
addData(codes, require('../src/apache.json'))

// write the JSON object
write(path.join(__dirname, '../codes.json'), codes)

function addData (db: Db,  obj: Object) {
  Object.keys(obj).forEach(function (key: string | number) {
    db[key] = db[key] || obj[key]
  })
}