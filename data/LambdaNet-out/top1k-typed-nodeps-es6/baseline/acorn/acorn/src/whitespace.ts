// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

export const lineBreak: RegExp = /\r\n?|\n|\u2028|\u2029/
export const lineBreakG: object = new RegExp(lineBreak.source, "g")

export function isNewLine(code: string): boolean {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029
}

export function nextLineBreak(code: RegExpValidationState, from: number, end: number = code.length): number {
  for (let i = from; i < end; i++) {
    let next: number = code.charCodeAt(i)
    if (isNewLine(next))
      return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1
  }
  return -1
}

export const nonASCIIwhitespace: RegExp = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/

export const skipWhiteSpace: RegExp = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
