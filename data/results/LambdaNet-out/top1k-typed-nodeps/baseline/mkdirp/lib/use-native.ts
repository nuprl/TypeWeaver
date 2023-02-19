const fs: string = require('fs')

const version: string = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version
const versArr: object = version.replace(/^v/, '').split('.')
const hasNative: number = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12

const useNative: Function = !hasNative ? () => false : (opts: object) => opts.mkdir === fs.mkdir
const useNativeSync: Function = !hasNative ? () => false : (opts: HTMLElement) => opts.mkdirSync === fs.mkdirSync

module.exports = {useNative, useNativeSync}
