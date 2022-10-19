import test from 'ava';
import semver from 'semver';

// not using rewire
import atLeastNode from '.';

// make sure logic isn't backwards in the matrix tests
// and make sure rewire isn't causing bugs
test('real-world sanity check; v4.1.0+', t => {
  t.true(atLeastNode('4.1.0'))
})
test("real-world sanity check; we aren't in the future", t => {
  t.false(atLeastNode(semver.inc(process.version, 'major')))
  t.false(atLeastNode(semver.inc(process.version, 'minor')))
  t.false(atLeastNode(semver.inc(process.version, 'patch')))
})
