import fs from 'fs';

const version: String = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version
const versArr: Object = version.replace(/^v/, '').split('.')
const hasNative: Number = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12

const useNative: Function = !hasNative ? () => false : (opts: HTMLElement) => opts.mkdir === fs.mkdir
const useNativeSync: Array = !hasNative ? () => false : (opts: HTMLElement) => opts.mkdirSync === fs.mkdirSync

export default {useNative, useNativeSync};
