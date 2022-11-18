const {hasOwnProperty, toString} = Object.prototype

export const hasOwn: number = Object.hasOwn || ((obj: string, propName: string) => (
  hasOwnProperty.call(obj, propName)
))

export const isArray: boolean = Array.isArray || ((obj: string) => (
  toString.call(obj) === "[object Array]"
))

export function wordsRegexp(words: string): object {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

export function codePointToString(code: number): number {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code)
  code -= 0x10000
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

export const loneSurrogate: RegExp = /[\uD800-\uDFFF]/u
