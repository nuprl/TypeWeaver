const fs = require('fs')
const { join } = require('path')
const t = require('tap')
const moveFile = require('../')

const fixture = '🦄'

t.test('missing `source` or `destination` throws', t => t.rejects(moveFile()))

t.test('move a file', async t => {
  const dir = t.testdir({
    src: fixture,
  })
  const dest = `${dir}/dest`
  await moveFile(`${dir}/src`, dest)
  t.equal(fs.readFileSync(dest, 'utf8'), fixture)
})

t.test('move a directory', async t => {
  const dir = t.testdir({
    src: {
      one: fixture,
      two: fixture,
      sub: {
        three: fixture,
        four: fixture,
        five: t.fixture('symlink', './four'),
      },
      link: t.fixture('symlink', './sub'),
    },
  })
  const dest = `${dir}/dest`
  await moveFile(`${dir}/src`, dest)
  const destStat = fs.statSync(dest)
  t.ok(destStat.isDirectory(), 'created a directory')
  t.equal(fs.readFileSync(`${dest}/one`, 'utf8'), fixture, 'copied file one')
  t.equal(fs.readFileSync(`${dest}/two`, 'utf8'), fixture, 'copied file two')
  const subStat = fs.statSync(`${dest}/sub`)
  t.ok(subStat.isDirectory(), 'created the subdirectory')
  t.equal(fs.readFileSync(`${dest}/sub/three`, 'utf8'), fixture, 'copied file three')
  t.equal(fs.readFileSync(`${dest}/sub/four`, 'utf8'), fixture, 'copied file four')
  t.ok(fs.lstatSync(`${dest}/sub/five`).isSymbolicLink(), 'created a file symbolic link')
  t.equal(fs.realpathSync(`${dest}/sub/five`), join(dest, 'sub/four'), 'created file symlink')
  t.equal(fs.readFileSync(`${dest}/sub/five`, 'utf8'), fixture, 'copied file four')
  t.ok(fs.lstatSync(`${dest}/link`).isSymbolicLink(), 'created a directory symbolic link')
})

t.test('other types of errors fail', async t => {
  const randoError = new Error()
  randoError.code = 'ERANDO'
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      rename: (s, d, cb) => process.nextTick(() => cb(randoError)),
    },
  })

  const dir = t.testdir({
    src: fixture,
  })
  const dest = `${dir}/dest`
  await t.rejects(() => moveFileWithError(`${dir}/src`, dest), randoError)
})

t.test('move a file across devices', async t => {
  const exdevError = new Error()
  exdevError.code = 'EXDEV'
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      rename: (s, d, cb) => process.nextTick(() => cb(exdevError)),
    },
  })

  const dir = t.testdir({
    src: fixture,
  })
  const dest = `${dir}/dest`
  await moveFileWithError(`${dir}/src`, dest)
  t.equal(fs.readFileSync(dest, 'utf8'), fixture)
})

t.test('move a file across devices (EPERM)', async t => {
  const exdevError = new Error()
  exdevError.code = 'EPERM'
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      rename: (s, d, cb) => process.nextTick(() => cb(exdevError)),
    },
  })

  const dir = t.testdir({
    src: fixture,
  })
  const dest = `${dir}/dest`
  await moveFileWithError(`${dir}/src`, dest)
  t.equal(fs.readFileSync(dest, 'utf8'), fixture)
})

t.test('move a directory across devices', async t => {
  const exdevError = new Error()
  exdevError.code = 'EXDEV'
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      rename: (s, d, cb) => process.nextTick(() => cb(exdevError)),
    },
  })

  const dir = t.testdir({
    src: {
      one: fixture,
      two: fixture,
      sub: {
        three: fixture,
        four: fixture,
        five: t.fixture('symlink', './four'),
        reallysub: {
          six: t.fixture('symlink', '../../one'),
        },
      },
      link: t.fixture('symlink', './sub'),
      abs: t.fixture('symlink', process.cwd()),
    },
  })
  const dest = `${dir}/dest`
  await moveFileWithError(`${dir}/src`, dest)
  t.ok(fs.statSync(dest).isDirectory(), 'created a directory')
  t.equal(fs.readFileSync(`${dest}/one`, 'utf8'), fixture, 'copied file one')
  t.equal(fs.readFileSync(`${dest}/two`, 'utf8'), fixture, 'copied file two')
  t.ok(fs.statSync(`${dest}/sub`).isDirectory(), 'created the subdirectory')
  t.equal(fs.readFileSync(`${dest}/sub/three`, 'utf8'), fixture, 'copied file three')
  t.equal(fs.readFileSync(`${dest}/sub/four`, 'utf8'), fixture, 'copied file four')
  t.ok(fs.lstatSync(`${dest}/sub/five`).isSymbolicLink(), 'created a file symbolic link')
  t.equal(fs.readlinkSync(`${dest}/sub/five`).replace(/\\/g, '/'), './four', 'created file symlink')
  t.ok(fs.lstatSync(`${dest}/link`).isSymbolicLink(), 'created a directory symbolic link')
  // below assertion varies for windows because junctions are absolute paths
  t.equal(
    fs.readlinkSync(`${dest}/link`),
    process.platform === 'win32' ? join(dest, 'sub\\') : './sub',
    'created the directory symbolic link with the correct target'
  )
  t.ok(fs.lstatSync(`${dest}/sub/reallysub`).isDirectory(), 'created the innermost subdirectory')
  t.ok(fs.lstatSync(`${dest}/sub/reallysub/six`).isSymbolicLink(), 'created the innermost symlink')
  t.equal(
    fs.readlinkSync(`${dest}/sub/reallysub/six`).replace(/\\/g, '/'),
    '../../one',
    'created the symlink with the appropriate target'
  )
  t.ok(fs.lstatSync(`${dest}/abs`).isSymbolicLink(), 'created the absolute path symlink')
  t.equal(
    fs.readlinkSync(`${dest}/abs`),
    process.platform === 'win32' ? `${process.cwd()}\\` : process.cwd(),
    'kept the correct absolute path'
  )
})

t.test('move a directory across devices (EPERM)', async t => {
  const exdevError = new Error()
  exdevError.code = 'EXDEV'
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      rename: (s, d, cb) => process.nextTick(() => cb(exdevError)),
    },
  })

  const dir = t.testdir({
    src: {
      one: fixture,
      two: fixture,
      sub: {
        three: fixture,
        four: fixture,
        five: t.fixture('symlink', './four'),
        reallysub: {
          six: t.fixture('symlink', '../../one'),
        },
      },
      link: t.fixture('symlink', './sub'),
      abs: t.fixture('symlink', process.cwd()),
    },
  })
  const dest = `${dir}/dest`
  await moveFileWithError(`${dir}/src`, dest)
  t.ok(fs.statSync(dest).isDirectory(), 'created a directory')
  t.equal(fs.readFileSync(`${dest}/one`, 'utf8'), fixture, 'copied file one')
  t.equal(fs.readFileSync(`${dest}/two`, 'utf8'), fixture, 'copied file two')
  t.ok(fs.statSync(`${dest}/sub`).isDirectory(), 'created the subdirectory')
  t.equal(fs.readFileSync(`${dest}/sub/three`, 'utf8'), fixture, 'copied file three')
  t.equal(fs.readFileSync(`${dest}/sub/four`, 'utf8'), fixture, 'copied file four')
  t.ok(fs.lstatSync(`${dest}/sub/five`).isSymbolicLink(), 'created a file symbolic link')
  t.equal(fs.readlinkSync(`${dest}/sub/five`).replace(/\\/g, '/'), './four', 'created file symlink')
  t.ok(fs.lstatSync(`${dest}/link`).isSymbolicLink(), 'created a directory symbolic link')
  // below assertion varies for windows because junctions are absolute paths
  t.equal(
    fs.readlinkSync(`${dest}/link`),
    process.platform === 'win32' ? join(dest, 'sub\\') : './sub',
    'created the directory symbolic link with the correct target'
  )
  t.ok(fs.lstatSync(`${dest}/sub/reallysub`).isDirectory(), 'created the innermost subdirectory')
  t.ok(fs.lstatSync(`${dest}/sub/reallysub/six`).isSymbolicLink(), 'created the innermost symlink')
  t.equal(
    fs.readlinkSync(`${dest}/sub/reallysub/six`).replace(/\\/g, '/'),
    '../../one',
    'created the symlink with the appropriate target'
  )
  t.ok(fs.lstatSync(`${dest}/abs`).isSymbolicLink(), 'created the absolute path symlink')
  t.equal(
    fs.readlinkSync(`${dest}/abs`),
    process.platform === 'win32' ? `${process.cwd()}\\` : process.cwd(),
    'kept the correct absolute path'
  )
})

t.test('overwrite option', async t => {
  const dir = t.testdir({
    src: 'x',
    dest: 'y',
  })
  await t.rejects(moveFile(`${dir}/src`, `${dir}/dest`, { overwrite: false }))
  t.equal(fs.readFileSync(`${dir}/dest`, 'utf8'), 'y')
  await moveFile(`${dir}/src`, `${dir}/dest`)
  t.equal(fs.readFileSync(`${dir}/dest`, 'utf8'), 'x')
})

t.test('overwrite option with non-ENOENT access error', async t => {
  const dir = t.testdir({
    src: 'x',
  })
  const er = Object.assign(new Error('its there, just bad'), {
    code: 'ETHEREBUTBAD',
  })
  const moveFileWithError = t.mock('../', {
    fs: {
      ...fs,
      access: (p, cb) => process.nextTick(() => cb(er)),
    },
  })
  await t.rejects(moveFileWithError(`${dir}/src`, `${dir}/dest`, { overwrite: false }))
  // it actually isn't there tho, so this fails, obviously
  t.throws(() => fs.readFileSync(`${dir}/dest`, 'utf8'), 'y')
  await moveFileWithError(`${dir}/src`, `${dir}/dest`)
  t.equal(fs.readFileSync(`${dir}/dest`, 'utf8'), 'x')
})
