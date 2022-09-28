const test: any = require('ava')
const rewire: any = require('rewire')
const semver: any = require('semver')

// loading with rewire to mock process.versions.node
const atLeastNode: any = rewire('.')

// test macro
const macro: void = (t: any, nodeVersion: string, requestedVersion: string, expectedResult: any) => {
  let result: any
  // rewire process.versions.node
  atLeastNode.__with__({ process: { versions: { node: nodeVersion } } })(() => {
    result = atLeastNode(requestedVersion)
  })
  t.is(result, expectedResult)
}
macro.title = (providedTitle: string, nodeVersion: string, requestedVersion: string, expectedResult: string) =>
  `${nodeVersion} ${expectedResult ? '≥' : '≱'} ${requestedVersion}`

// compile a list of all possible versions X.X.X, where X is 0, 1, 2, or 10
const arr: number[] = [0, 1, 2, 10]
const versions: any[] = []
arr.forEach((major: any) =>
  arr.forEach((minor: any) =>
    arr.forEach((patch: string) => versions.push([major, minor, patch].join('.')))
  )
)
versions.shift() // remove 0.0.0

// compare all versions agaist each other, and verify result matches semver.gte()
versions.forEach((nodeVersion: any) =>
  versions.forEach((requestedVersion: string) =>
    test(
      macro,
      nodeVersion,
      requestedVersion,
      semver.gte(nodeVersion, requestedVersion)
    )
  )
)
