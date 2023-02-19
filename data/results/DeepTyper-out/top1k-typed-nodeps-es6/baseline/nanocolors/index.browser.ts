let nope: string = (s: string) => '' + s

export let isColorSupported: boolean = false
export let reset: any = nope
export let bold: any = nope
export let dim: number = nope
export let italic: any = nope
export let underline: string = nope
export let inverse: boolean = nope
export let hidden: any = nope
export let strikethrough: any = nope
export let black: string = nope
export let red: any = nope
export let green: number = nope
export let yellow: string = nope
export let blue: string = nope
export let magenta: string = nope
export let cyan: any = nope
export let white: string = nope
export let gray: string = nope
export let bgBlack: string = nope
export let bgRed: any = nope
export let bgGreen: any = nope
export let bgYellow: any = nope
export let bgBlue: any = nope
export let bgMagenta: any = nope
export let bgCyan: any = nope
export let bgWhite: any = nope

export function createColors(): any {
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
