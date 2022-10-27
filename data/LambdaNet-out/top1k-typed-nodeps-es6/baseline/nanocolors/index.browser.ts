let nope: Function = (s: String) => '' + s

export let isColorSupported: Boolean = false
export let reset: Function = nope
export let bold: String = nope
export let dim: String = nope
export let italic: String = nope
export let underline: String = nope
export let inverse: String = nope
export let hidden: String = nope
export let strikethrough: String = nope
export let black: String = nope
export let red: String = nope
export let green: String = nope
export let yellow: String = nope
export let blue: String = nope
export let magenta: String = nope
export let cyan: String = nope
export let white: String = nope
export let gray: String = nope
export let bgBlack: String = nope
export let bgRed: String = nope
export let bgGreen: String = nope
export let bgYellow: String = nope
export let bgBlue: String = nope
export let bgMagenta: String = nope
export let bgCyan: String = nope
export let bgWhite: String = nope

export function createColors(): Object {
  return {
    isColorSupported,
    reset,
    bold,
    dim,
    italic,
    underline,
    inverse,
    hidden,
    strikethrough,
    black,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    gray,
    bgBlack,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite
  }
}
