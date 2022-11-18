const isWindows: boolean = typeof process === 'object' &&
  process &&
  process.platform === 'win32'
export default isWindows ? { sep: '\\' } : { sep: '/' };
