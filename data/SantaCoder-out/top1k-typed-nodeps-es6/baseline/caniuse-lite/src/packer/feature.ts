import path from 'path';
import { promises as fs } from 'fs';
import t from '@babel/types';
import generateCode from '../lib/generateCode';
import getContentsFactory from '../lib/getContents';
import moduleExports from '../lib/moduleExports';
import stringifyObject from '../lib/stringifyObject';
import statuses from '../../dist/lib/statuses';
import supported from '../../dist/lib/supported';
import fromEntries from '../util/fromEntries';
import invertObj from '../util/invertObj';
import parseDecimal from '../util/parseDecimal';
import sum from '../util/sum';
import browsers from '../../data/browsers';
import versions from '../../data/browserVersions';

const browsersInverted = invertObj(browsers)
const statusesInverted = invertObj(statuses)
const versionsInverted = invertObj(versions)

const base = path.join(
  path.dirname(require.resolve(`caniuse-db/data.json`)),
  `features-json`
)

const getContents = getContentsFactory(base)

const requireCall = moduleName =>
  t.callExpression(t.identifier('require'), [t.stringLiteral(moduleName)])

function featureIndex(features: Feature[]) {
  let index = t.objectExpression(
    features.map(({ name }) =>
      t.objectProperty(t.stringLiteral(name), requireCall(`./features/${name}`))
    )
  )

  return generateCode([moduleExports(index)])
}

function packSupport(supportData: PackSupportData) {
  return sum(
    supportData.split(' ').map(support => {
      if (support in supported) {
        return supported[support]
      }
      return 2 ** (6 + parseDecimal(support.slice(1)))
    })
  )
}

export default async function packFeature() {
  let features = await fs.readdir(base).then(getContents)

  await Promise.all(
    features.map(({ name, contents }) => {
      let packed = {}

      packed.A = fromEntries(
        Object.entries(contents.stats).map(([key, browser]) => {
          let supportData = fromEntries(
            Object.entries(browser).map(([version, support]) => [
              versionsInverted[version],
              packSupport(support)
            ])
          )

          let compacted = Object.entries(supportData).reduce(
            (min, [k, value]) => {
              if (!min[value]) {
                min[value] = k
              } else {
                min[value] += ` ${k}`
              }
              return min
            },
            {}
          )

          return [browsersInverted[key], compacted]
        })
      )
      packed.B = parseDecimal(statusesInverted[contents.status])
      packed.C = contents.title
      return fs.writeFile(
        path.join(__dirname, `../../data/features/${name}.js`),
        stringifyObject(packed)
      )
    })
  )

  return fs.writeFile(
    path.join(__dirname, '../../data/features.js'),
    featureIndex(features)
  )
};