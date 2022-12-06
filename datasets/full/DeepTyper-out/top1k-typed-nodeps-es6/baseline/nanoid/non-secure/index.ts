// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet: string =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

export let customAlphabet: string = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id: string = ''
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i: number = size
    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}

export let nanoid: number = (size = 21) => {
  let id: string = ''
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i: number = size
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}
