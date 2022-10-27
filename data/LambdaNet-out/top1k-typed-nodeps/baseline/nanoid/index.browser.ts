// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.

export { urlAlphabet } from './url-alphabet/index.js'

export let random: Function = (bytes: Array) => crypto.getRandomValues(new Uint8Array(bytes))

export let customRandom: Function = (alphabet: Array, defaultSize: Number, getRandom: Function) => {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  let mask: Number = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.

  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.

  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).

  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer
  let step: Number = -~((1.6 * mask * defaultSize) / alphabet.length)

  return (size: Number = defaultSize) => {
    let id: String = ''
    while (true) {
      let bytes: Promise = getRandom(step)
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let j: Number = step
      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}

export let customAlphabet: Function = (alphabet: Array, size: String = 21) =>
  customRandom(alphabet, size, random)

export let nanoid: Function = (size: Array = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id: Number, byte: Number) => {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    byte &= 63
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36)
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')

