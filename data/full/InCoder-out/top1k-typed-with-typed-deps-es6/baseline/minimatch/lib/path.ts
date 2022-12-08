const isWindows = typeof process === 'object' &&
  process &&
  process.platform === 'win32'
export default isWindows ? { sep: '\\' } : { sep: '/' };