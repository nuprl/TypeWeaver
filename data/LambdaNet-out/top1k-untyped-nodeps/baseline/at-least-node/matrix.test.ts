const test: Function = require('ava')
const rewire: Function = require('rewire')
const semver: String = require('semver')

// loading with rewire to mock process.versions.node
const atLeastNode: Function = rewire('.')

// test macro
const macro: Function = (t: String, nodeVersion: Object, requestedVersion: Number, expectedResult: Boolean) => {
  let result: String
  // rewire process.versions.node
  atLeastNode.__with__({ process: { versions: { node: nodeVersion } } })(() => {
    result = atLeastNode(requestedVersion)
  })
  t.is(result, expectedResult)
}
macro.title = (providedTitle: Number, nodeVersion: String, requestedVersion: String, expectedResult: Boolean) =>
  `${nodeVersion} ${expectedResult ? '≥' : '≱'} ${requestedVersion}`

// compile a list of all possible versions X.X.X, where X is 0, 1, 2, or 10
const arr: Array = [0, 1, 2, 10]
const versions: Array = []
arr.forEach((major: String) =>
  arr.forEach((minor: Function) =>
    arr.forEach((patch: String) => versions.push([major, minor, patch].join('.')))
  )
)
versions.shift() // remove 0.0.0

// compare all versions agaist each other, and verify result matches semver.gte()
versions.forEach((nodeVersion: Array) =>
  versions.forEach((requestedVersion: Number) =>
    test(
      macro,
      nodeVersion,
      requestedVersion,
      semver.gte(nodeVersion, requestedVersion)
    )
  )
)
