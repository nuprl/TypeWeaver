const optsArg: any = require('./lib/opts-arg.js')
const pathArg: any = require('./lib/path-arg.js')

const {mkdirpNative, mkdirpNativeSync} = require('./lib/mkdirp-native.js')
const {mkdirpManual, mkdirpManualSync} = require('./lib/mkdirp-manual.js')
const {useNative, useNativeSync} = require('./lib/use-native.js')


const mkdirp: any = (path: string, opts: any) => {
  path = pathArg(path)
  opts = optsArg(opts)
  return useNative(opts)
    ? mkdirpNative(path, opts)
    : mkdirpManual(path, opts)
}

const mkdirpSync: any = (path: string, opts: any) => {
  path = pathArg(path)
  opts = optsArg(opts)
  return useNativeSync(opts)
    ? mkdirpNativeSync(path, opts)
    : mkdirpManualSync(path, opts)
}

mkdirp.sync = mkdirpSync
mkdirp.native = (path: string, opts: any) => mkdirpNative(pathArg(path), optsArg(opts))
mkdirp.manual = (path: string, opts: any) => mkdirpManual(pathArg(path), optsArg(opts))
mkdirp.nativeSync = (path: string, opts: any) => mkdirpNativeSync(pathArg(path), optsArg(opts))
mkdirp.manualSync = (path: string, opts: any) => mkdirpManualSync(pathArg(path), optsArg(opts))

module.exports = mkdirp
