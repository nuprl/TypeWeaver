const test: any = require('ava')
const semver: any = require('semver')

// not using rewire
const atLeastNode: any = require('.')

// make sure logic isn't backwards in the matrix tests
// and make sure rewire isn't causing bugs
test('real-world sanity check; v4.1.0+', (t: any) => {
  t.true(atLeastNode('4.1.0'))
})
test("real-world sanity check; we aren't in the future", (t: any) => {
  t.false(atLeastNode(semver.inc(process.version, 'major')))
  t.false(atLeastNode(semver.inc(process.version, 'minor')))
  t.false(atLeastNode(semver.inc(process.version, 'patch')))
})
