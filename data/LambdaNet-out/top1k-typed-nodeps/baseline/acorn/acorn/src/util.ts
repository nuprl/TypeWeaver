const {hasOwnProperty, toString} = Object.prototype

export const hasOwn: Number = Object.hasOwn || ((obj: Position, propName: String) => (
  hasOwnProperty.call(obj, propName)
))

export const isArray: Boolean = Array.isArray || ((obj: Position) => (
  toString.call(obj) === "[object Array]"
))

export function wordsRegexp(words: String): Object {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

export function codePointToString(code: Number): Number {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code)
  code -= 0x10000
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00)
}

export const loneSurrogate: RegExp = /[\uD800-\uDFFF]/u
