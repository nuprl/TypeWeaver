import { join, dirname } from 'path';
import 'fs';
import { equal } from 'uvu/assert';
import { test } from 'uvu';
import getContentsFactory from './lib/getContents';
import regions from '../dist/unpacker/region';

let fulldata = {}

const base = join(
  dirname(require.resolve(`caniuse-db/data.json`)),
  `region-usage-json`
)

const getContents = getContentsFactory(base)

test.before(() => {
  return readdir(base)
    .then(getContents)
    .then(regions2 => {
      regions2.forEach(region => {
        fulldata[region.name] = region.contents
      })
    })
})

test('should be 1:1', () => {
  Object.keys(fulldata).forEach(key => {
    let data = fulldata[key]
    let packed = require(join(__dirname, `../data/regions/${key}.js`))
    let unpacked = regions(packed)
    equal(unpacked, data.data)
  })
})

test.run()
