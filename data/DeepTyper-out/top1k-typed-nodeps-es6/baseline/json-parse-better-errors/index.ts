'use strict'

export default parseJson;
function parseJson (txt: string, reviver: any, context: any): any {
  context = context || 20
  try {
    return JSON.parse(txt, reviver)
  } catch (e) {
    if (typeof txt !== 'string') {
      const isEmptyArray: boolean = Array.isArray(txt) && txt.length === 0
      const errorMessage: string = 'Cannot parse ' +
      (isEmptyArray ? 'an empty array' : String(txt))
      throw new TypeError(errorMessage)
    }
    const syntaxErr: any = e.message.match(/^Unexpected token.*position\s+(\d+)/i)
    const errIdx: number = syntaxErr
    ? +syntaxErr[1]
    : e.message.match(/^Unexpected end of JSON.*/i)
    ? txt.length - 1
    : null
    if (errIdx != null) {
      const start: number = errIdx <= context
      ? 0
      : errIdx - context
      const end: number = errIdx + context >= txt.length
      ? txt.length
      : errIdx + context
      e.message += ` while parsing near '${
        start === 0 ? '' : '...'
      }${txt.slice(start, end)}${
        end === txt.length ? '' : '...'
      }'`
    } else {
      e.message += ` while parsing '${txt.slice(0, context * 2)}'`
    }
    throw e
  }
}
