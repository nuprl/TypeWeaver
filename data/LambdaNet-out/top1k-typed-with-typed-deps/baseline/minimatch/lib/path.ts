const isWindows: Boolean = typeof process === 'object' &&
  process &&
  process.platform === 'win32'
module.exports = isWindows ? { sep: '\\' } : { sep: '/' }
