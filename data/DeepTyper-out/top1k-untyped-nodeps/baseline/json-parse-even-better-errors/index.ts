'use strict'

const hexify: string = (char: string) => {
  const h: string = char.charCodeAt(0).toString(16).toUpperCase()
  return '0x' + (h.length % 2 ? '0' : '') + h
}

const parseError: any = (e: any, txt: string, context: any) => {
  if (!txt) {
    return {
      message: e.message + ' while parsing empty string',
      position: 0,
    }
  }
  const badToken: string = e.message.match(/^Unexpected token (.) .*position\s+(\d+)/i)
  const errIdx: string = badToken ? +badToken[2]
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

    const slice: string = (start === 0 ? '' : '...') +
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
    const metadata: any = parseError(er, txt, context)
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

const kIndent: symbol = Symbol.for('indent')
const kNewline = Symbol.for('newline')
// only respect indentation if we got a line break, otherwise squash it
// things other than objects and arrays aren't indented, so ignore those
// Important: in both of these regexps, the $1 capture group is the newline
// or undefined, and the $2 capture group is the indent, or undefined.
const formatRE = /^\s*[{\[]((?:\r?\n)+)([\s\t]*)/
const emptyRE: string = /^(?:\{\}|\[\])((?:\r?\n)+)?$/

const parseJson: any = (txt: string, reviver: any, context: any) => {
  const parseText: any = stripBOM(txt)
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

    const result: any = JSON.parse(parseText, reviver)
    if (result && typeof result === 'object') {
      result[kNewline] = newline
      result[kIndent] = indent
    }
    return result
  } catch (e) {
    if (typeof txt !== 'string' && !Buffer.isBuffer(txt)) {
      const isEmptyArray: boolean = Array.isArray(txt) && txt.length === 0
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
const stripBOM: string = (txt: string) => String(txt).replace(/^\uFEFF/, '')

module.exports = parseJson
parseJson.JSONParseError = JSONParseError

parseJson.noExceptions = (txt: string, reviver: string) => {
  try {
    return JSON.parse(stripBOM(txt), reviver)
  } catch (e) {}
}
