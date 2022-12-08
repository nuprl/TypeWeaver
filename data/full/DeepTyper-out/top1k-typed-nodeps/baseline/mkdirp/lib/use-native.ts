const fs: any = require('fs')

const version: any = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version
const versArr: any = version.replace(/^v/, '').split('.')
const hasNative: any = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12

const useNative: boolean = !hasNative ? () => false : (opts: any) => opts.mkdir === fs.mkdir
const useNativeSync: boolean = !hasNative ? () => false : (opts: any) => opts.mkdirSync === fs.mkdirSync

module.exports = {useNative, useNativeSync}
