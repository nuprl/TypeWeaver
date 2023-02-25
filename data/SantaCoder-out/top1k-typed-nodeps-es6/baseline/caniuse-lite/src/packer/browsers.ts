/* Create a mapping from browser version strings to shorter identifiers. */

import path from 'path';

import { promises as fs } from 'fs';
import stringifyObject from '../lib/stringifyObject';
import { encode } from '../lib/base62';
import fromEntries from '../util/fromEntries';

function getBrowsers({ data }: BrowsersResponse) {
  let feature = Object.keys(data)[0]
  let browsers = Object.keys(data[feature].stats)

  return stringifyObject(
    fromEntries(browsers.map((browser, index) => [encode(index), browser]))
  )
}

export default () =>
  fs.writeFile(
    path.join(__dirname, '..', '..', 'data', 'browsers.js'),
    getBrowsers(require('caniuse-db/data.json'))
  );