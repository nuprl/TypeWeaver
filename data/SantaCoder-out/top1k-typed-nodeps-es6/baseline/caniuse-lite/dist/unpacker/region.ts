'use strict'

import { browsers } from './browsers';

function unpackRegion(packed: number) {
  return Object.keys(packed).reduce((list, browser) => {
    let data = packed[browser]
    list[browsers[browser]] = Object.keys(data).reduce((memo, key) => {
      let stats = data[key]
      if (key === '_') {
        stats.split(' ').forEach(version => (memo[version] = null))
      } else {
        memo[key] = stats
      }
      return memo
    }, {})
    return list
  }, {})
}

export default unpackRegion;
export const default = unpackRegion;