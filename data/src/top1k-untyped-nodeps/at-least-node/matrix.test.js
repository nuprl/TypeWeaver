const test = require('ava')
const rewire = require('rewire')
const semver = require('semver')

// loading with rewire to mock process.versions.node
const atLeastNode = rewire('.')

// test macro
const macro = (t, nodeVersion, requestedVersion, expectedResult) => {
  let result
  // rewire process.versions.node
  atLeastNode.__with__({ process: { versions: { node: nodeVersion } } })(() => {
    result = atLeastNode(requestedVersion)
  })
  t.is(result, expectedResult)
}
macro.title = (providedTitle, nodeVersion, requestedVersion, expectedResult) =>
  `${nodeVersion} ${expectedResult ? '≥' : '≱'} ${requestedVersion}`

// compile a list of all possible versions X.X.X, where X is 0, 1, 2, or 10
const arr = [0, 1, 2, 10]
const versions = []
arr.forEach(major =>
  arr.forEach(minor =>
    arr.forEach(patch => versions.push([major, minor, patch].join('.')))
  )
)
versions.shift() // remove 0.0.0

// compare all versions agaist each other, and verify result matches semver.gte()
versions.forEach(nodeVersion =>
  versions.forEach(requestedVersion =>
    test(
      macro,
      nodeVersion,
      requestedVersion,
      semver.gte(nodeVersion, requestedVersion)
    )
  )
)
