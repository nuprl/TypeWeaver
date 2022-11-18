let nope: Function = (s: string) => '' + s

export let isColorSupported: boolean = false
export let reset: Function = nope
export let bold: string = nope
export let dim: string = nope
export let italic: string = nope
export let underline: string = nope
export let inverse: string = nope
export let hidden: string = nope
export let strikethrough: string = nope
export let black: string = nope
export let red: string = nope
export let green: string = nope
export let yellow: string = nope
export let blue: string = nope
export let magenta: string = nope
export let cyan: string = nope
export let white: string = nope
export let gray: string = nope
export let bgBlack: string = nope
export let bgRed: string = nope
export let bgGreen: string = nope
export let bgYellow: string = nope
export let bgBlue: string = nope
export let bgMagenta: string = nope
export let bgCyan: string = nope
export let bgWhite: string = nope

export function createColors(): object {
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
