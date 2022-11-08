import path from 'path';
import { promises as fs } from 'fs';
import getContentsFactory from '../lib/getContents';
import stringifyObject from '../lib/stringifyObject';
import fromEntries from '../util/fromEntries';
import invertObj from '../util/invertObj';
import browsers from '../../data/browsers';

const browsersInverted = invertObj(browsers)

const base = path.join(
  path.dirname(require.resolve(`caniuse-db/data.json`)),
  `region-usage-json`
)

const getContents = getContentsFactory(base)

export default async function packRegion() {
  let regions = await fs.readdir(base).then(getContents)

  return Promise.all(
    regions.map(region => {
      let {
        contents: { data }
      } = region
      let packed = fromEntries(
        Object.entries(data).map(([key, stats]) => [
          browsersInverted[key],
          Object.entries(stats).reduce((l, [k, stat]) => {
            if (stat === null) {
              if (l._) {
                l._ += ` ${k}`
              } else {
                l._ = k
              }
              return l
            }
            l[k] = stat
            return l
          }, {})
        ])
      )

      return fs.writeFile(
        path.join(__dirname, `../../data/regions/${region.name}.js`),
        stringifyObject(packed)
      )
    })
  )
};