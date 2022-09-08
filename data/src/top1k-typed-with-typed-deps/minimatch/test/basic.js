// http://www.bashcookbook.com/bashinfo/source/bash-1.14.7/tests/glob-test
//
// TODO: Some of these tests do very bad things with backslashes, and will
// most likely fail badly on windows.  They should probably be skipped.

const t = require('tap')
const globalBefore = Object.keys(global)
const mm = require('../')
const patterns = require('./patterns.js')

t.test('basic tests', function (t) {
  var start = Date.now()

  // [ pattern, [matches], MM opts, files, TAP opts]
  patterns.forEach(function (c) {
    if (typeof c === 'function') return c()
    if (typeof c === 'string') return t.comment(c)

    var pattern = c[0],
      expect = c[1].sort(alpha),
      options = c[2] || {},
      f = c[3] || patterns.files,
      tapOpts = c[4] || {}

    // options.debug = true
    var m = new mm.Minimatch(pattern, options)
    var r = m.makeRe()
    var r2 = mm.makeRe(pattern, options)
    t.equal(String(r), String(r2), 'same results from both makeRe fns')
    tapOpts.re = r
    tapOpts.files = JSON.stringify(f)
    tapOpts.pattern = pattern
    tapOpts.set = m.set
    tapOpts.negated = m.negate

    var actual = mm.match(f, pattern, options)
    actual.sort(alpha)

    t.same(
      actual, expect,
      JSON.stringify(pattern) + ' ' + JSON.stringify(expect),
      tapOpts
    )

    t.matchSnapshot(tapOpts.re, 'makeRe ' + pattern, tapOpts)
  })

  t.comment('time=' + (Date.now() - start) + 'ms')
  t.end()
})

t.test('global leak test', function (t) {
  var globalAfter = Object.keys(global).filter(function (k) {
    return (k !== '__coverage__' && k !== '__core-js_shared__')
  })
  t.same(globalAfter, globalBefore, 'no new globals, please')
  t.end()
})

t.test('invalid patterns', t => {
  const toolong = 'x'.repeat(64 * 1024) + 'y'
  const expectTooLong = { message: 'pattern is too long' }
  t.throws(() => mm.braceExpand(toolong), expectTooLong)
  t.throws(() => new mm.Minimatch(toolong), expectTooLong)
  t.throws(() => mm('xy', toolong), expectTooLong)
  t.throws(() => mm.match(['xy'], toolong), expectTooLong)

  const invalid = { message: 'invalid pattern' }
  const invalids = [
    null,
    1234,
    NaN,
    Infinity,
    undefined,
    {a: 1},
    true,
    false,
  ]
  for (const i of invalids) {
    t.throws(() => mm.braceExpand(i), invalid)
    t.throws(() => new mm.Minimatch(i), invalid)
    t.throws(() => mm('xy', i), invalid)
    t.throws(() => mm.match(['xy'], i), invalid)
  }

  t.end()
})

t.test('nocomment matches nothing', t => {
  t.equal(mm('#comment', '#comment', { nocomment: false }), false)
  t.equal(mm('#comment', '#comment', { nocomment: true }), true)
  t.end()
})

t.test('filter function', t => {
  t.same(['a', 'b', 'c'].filter(mm.filter('@(a|b)')), ['a', 'b'])
  t.end()
})

t.test('whitespace handling', t => {
  t.equal(mm('x/y', 'y'), false)
  t.equal(mm('x/y', 'y', { matchBase: true }), true)
  t.equal(mm('x/ ', ' '), false)
  t.equal(mm('x/ ', ' ', { matchBase: true }), true)
  t.equal(mm('x/', ''), false)
  t.equal(mm('x/', '', { matchBase: true }), false)
  t.equal(mm('', ''), true)
  t.equal(mm(' ', ''), false)
  t.equal(mm('', ' '), false)
  t.equal(mm(' ', ' '), true)
  t.end()
})

t.test('mm debug', t => {
  const { error } = console
  t.teardown(() => console.error = error)
  const errs = []
  console.error = (...msg) => errs.push(msg)
  t.equal(mm('a/b/c', 'a/**/@(b|c)/**', { debug: true }), true)
  t.not(errs.length, 0)
  t.end()
})

t.test('makeRe repeated', t => {
  const mmRE = mm.makeRe('a/*/*')
  const m = new mm.Minimatch('a/*/*')
  const mRE = m.makeRe()
  const mRE2 = m.makeRe()
  t.equal(mRE, mRE2)
  t.same(mmRE, mRE)
  t.end()
})

t.test('in noglobstar mode, ** is equivalent to *', t => {
  const re2s = mm.makeRe('**', { noglobstar: true })
  const re1s = mm.makeRe('*', { noglobstar: true })
  t.same(re2s, re1s)
  t.end()
})

t.test('flipNegate', t => {
  t.equal(mm('x', '!x', { flipNegate: true }), true)
  t.equal(mm('x', '!!x', { flipNegate: true }), true)
  t.equal(mm('x', 'x', { flipNegate: true }), true)

  t.equal(mm('x', '!y', { flipNegate: true }), false)
  t.equal(mm('x', '!!y', { flipNegate: true }), false)
  t.equal(mm('x', 'y', { flipNegate: true }), false)
  t.end()
})

function alpha (a, b) {
  return a > b ? 1 : -1
}

t.test('GLOBSTAR marker exposed', t => {
  t.match(mm.GLOBSTAR, Symbol)
  t.end()
})

t.test('globstar re matches zero or more path portions', t => {
  const cases = {
    'path/**/*.html': {
      'path/x.html': true,
      'path/x/y.html': true,
      'path/x/y/z.html': true,
      'path//x.html': true,
      'path//x//y.html': true,
      'path//x//y//z.html': true,
      'path.html': false,
      'pathx.html': false,
      'pathx/y.html': false,
      'pathx/y/z.html': false,
    },
    'path/**/**/*.html': {
      'path/x.html': true,
      'path/x/y.html': true,
      'path/x/y/z.html': true,
      'path//x.html': true,
      'path//x//y.html': true,
      'path//x//y//z.html': true,
      'path.html': false,
      'pathx.html': false,
      'pathx/y.html': false,
      'pathx/y/z.html': false,
    },
    '**/*.html': {
      'path/x.html': true,
      'path/x/y.html': true,
      'path/x/y/z.html': true,
      'path//x.html': true,
      'path//x//y.html': true,
      'path//x//y//z.html': true,
      'path.html': true,
      'pathx.html': true,
      'pathx/y.html': true,
      'pathx/y/z.html': true,
      '/z.html': true,
    },
    '**/**/*.html': {
      'path/x.html': true,
      'path/x/y.html': true,
      'path/x/y/z.html': true,
      'path//x.html': true,
      'path//x//y.html': true,
      'path//x//y//z.html': true,
      'path.html': true,
      'pathx.html': true,
      'pathx/y.html': true,
      'pathx/y/z.html': true,
      '/z.html': true,
    },
  }
  for (const [pattern, set] of Object.entries(cases)) {
    t.test(pattern, t => {
      const re = mm.makeRe(pattern)
      for (const [path, res] of Object.entries(set)) {
        t.equal(re.test(path), res, path, { re, pattern })
      }
      t.end()
    })
  }
  t.end()
})
