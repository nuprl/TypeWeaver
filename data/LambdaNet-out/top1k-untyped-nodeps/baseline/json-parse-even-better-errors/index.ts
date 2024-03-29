'use strict'

const hexify: Function = (char: string) => {
  const h: string = char.charCodeAt(0).toString(16).toUpperCase()
  return '0x' + (h.length % 2 ? '0' : '') + h
}

const parseError: Function = (e: object, txt: any[], context: number) => {
  if (!txt) {
    return {
      message: e.message + ' while parsing empty string',
      position: 0,
    }
  }
  const badToken: Promise = e.message.match(/^Unexpected token (.) .*position\s+(\d+)/i)
  const errIdx: number = badToken ? +badToken[2]
    : e.message.match(/^Unexpected end of JSON.*/i) ? txt.length - 1
    : null

  const msg: string = badToken ? e.message.replace(/^Unexpected token ./, `Unexpected token ${
      JSON.stringify(badToken[1])
    } (${hexify(badToken[1])})`)
    : e.message

  if (errIdx !== null && errIdx !== undefined) {
    const start: number = errIdx <= context ? 0
      : errIdx - context

    const end: number = errIdx + context >= txt.length ? txt.length
      : errIdx + context

    const slice: number = (start === 0 ? '' : '...') +
      txt.slice(start, end) +
      (end === txt.length ? '' : '...')

    const near: string = txt === slice ? '' : 'near '

    return {
      message: msg + ` while parsing ${near}${JSON.stringify(slice)}`,
      position: errIdx,
    }
  } else {
    return {
      message: msg + ` while parsing '${txt.slice(0, context * 2)}'`,
      position: 0,
    }
  }
}

class JSONParseError extends SyntaxError {
  constructor (er, txt, context, caller) {
    context = context || 20
    const metadata: object = parseError(er, txt, context)
    super(metadata.message)
    Object.assign(this, metadata)
    this.code = 'EJSONPARSE'
    this.systemError = er
    Error.captureStackTrace(this, caller || this.constructor)
  }
  get name () { return this.constructor.name }
  set name (n) {}
  get [Symbol.toStringTag] () { return this.constructor.name }
}

const kIndent: string = Symbol.for('indent')
const kNewline: string = Symbol.for('newline')
// only respect indentation if we got a line break, otherwise squash it
// things other than objects and arrays aren't indented, so ignore those
// Important: in both of these regexps, the $1 capture group is the newline
// or undefined, and the $2 capture group is the indent, or undefined.
const formatRE: RegExp = /^\s*[{\[]((?:\r?\n)+)([\s\t]*)/
const emptyRE: RegExp = /^(?:\{\}|\[\])((?:\r?\n)+)?$/

const parseJson: Function = (txt: string, reviver: string, context: string) => {
  const parseText: string = stripBOM(txt)
  context = context || 20
  try {
    // get the indentation so that we can save it back nicely
    // if the file starts with {" then we have an indent of '', ie, none
    // otherwise, pick the indentation of the next line after the first \n
    // If the pattern doesn't match, then it means no indentation.
    // JSON.stringify ignores symbols, so this is reasonably safe.
    // if the string is '{}' or '[]', then use the default 2-space indent.
    const [, newline = '\n', indent = '  '] = parseText.match(emptyRE) ||
      parseText.match(formatRE) ||
      [, '', '']

    const result: object = JSON.parse(parseText, reviver)
    if (result && typeof result === 'object') {
      result[kNewline] = newline
      result[kIndent] = indent
    }
    return result
  } catch (e) {
    if (typeof txt !== 'string' && !Buffer.isBuffer(txt)) {
      const isEmptyArray = Array.isArray(txt) && txt.length === 0
      throw Object.assign(new TypeError(
        `Cannot parse ${isEmptyArray ? 'an empty array' : String(txt)}`
      ), {
        code: 'EJSONPARSE',
        systemError: e,
      })
    }

    throw new JSONParseError(e, parseText, context, parseJson)
  }
}

// Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
// because the buffer-to-string conversion in `fs.readFileSync()`
// translates it to FEFF, the UTF-16 BOM.
const stripBOM: Function = (txt: string) => String(txt).replace(/^\uFEFF/, '')

module.exports = parseJson
parseJson.JSONParseError = JSONParseError

parseJson.noExceptions = (txt: string, reviver: string) => {
  try {
    return JSON.parse(stripBOM(txt), reviver)
  } catch (e) {}
}
