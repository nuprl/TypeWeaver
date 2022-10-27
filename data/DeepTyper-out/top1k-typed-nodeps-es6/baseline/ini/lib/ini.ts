const { hasOwnProperty } = Object.prototype

/* istanbul ignore next */
const eol: any = typeof process !== 'undefined' &&
  process.platform === 'win32' ? '\r\n' : '\n'

const encode: any = (obj: any, opt: any) => {
  const children: any[] = []
  let out: string = ''

  if (typeof opt === 'string') {
    opt = {
      section: opt,
      whitespace: false,
    }
  } else {
    opt = opt || Object.create(null)
    opt.whitespace = opt.whitespace === true
  }

  const separator: string = opt.whitespace ? ' = ' : '='

  for (const k of Object.keys(obj)) {
    const val: any = obj[k]
    if (val && Array.isArray(val)) {
      for (const item of val) {
        out += safe(k + '[]') + separator + safe(item) + eol
      }
    } else if (val && typeof val === 'object') {
      children.push(k)
    } else {
      out += safe(k) + separator + safe(val) + eol
    }
  }

  if (opt.section && out.length) {
    out = '[' + safe(opt.section) + ']' + eol + out
  }

  for (const k of children) {
    const nk: string = dotSplit(k).join('\\.')
    const section: string = (opt.section ? opt.section + '.' : '') + nk
    const { whitespace } = opt
    const child: any = encode(obj[k], {
      section,
      whitespace,
    })
    if (out.length && child.length) {
      out += eol
    }

    out += child
  }

  return out
}

const dotSplit: string = (str: any) =>
  str.replace(/\1/g, '\u0002LITERAL\\1LITERAL\u0002')
    .replace(/\\\./g, '\u0001')
    .split(/\./)
    .map((part: string) =>
      part.replace(/\1/g, '\\.')
        .replace(/\2LITERAL\\1LITERAL\2/g, '\u0001'))

const decode: string = (str: string) => {
  const out: any = Object.create(null)
  let p: any = out
  let section: string = null
  //          section     |key      = value
  const re: RegExp = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i
  const lines: string[] = str.split(/[\r\n]+/g)

  for (const line of lines) {
    if (!line || line.match(/^\s*[;#]/)) {
      continue
    }
    const match: any = line.match(re)
    if (!match) {
      continue
    }
    if (match[1] !== undefined) {
      section = unsafe(match[1])
      if (section === '__proto__') {
        // not allowed
        // keep parsing the section, but don't attach it.
        p = Object.create(null)
        continue
      }
      p = out[section] = out[section] || Object.create(null)
      continue
    }
    const keyRaw: any = unsafe(match[2])
    const isArray: boolean = keyRaw.length > 2 && keyRaw.slice(-2) === '[]'
    const key: string = isArray ? keyRaw.slice(0, -2) : keyRaw
    if (key === '__proto__') {
      continue
    }
    const valueRaw: string = match[3] ? unsafe(match[4]) : true
    const value: any = valueRaw === 'true' ||
      valueRaw === 'false' ||
      valueRaw === 'null' ? JSON.parse(valueRaw)
      : valueRaw

    // Convert keys with '[]' suffix to an array
    if (isArray) {
      if (!hasOwnProperty.call(p, key)) {
        p[key] = []
      } else if (!Array.isArray(p[key])) {
        p[key] = [p[key]]
      }
    }

    // safeguard against resetting a previously defined
    // array by accidentally forgetting the brackets
    if (Array.isArray(p[key])) {
      p[key].push(value)
    } else {
      p[key] = value
    }
  }

  // {a:{y:1},"a.b":{x:2}} --> {a:{y:1,b:{x:2}}}
  // use a filter to return the keys that have to be deleted.
  const remove: any[] = []
  for (const k of Object.keys(out)) {
    if (!hasOwnProperty.call(out, k) ||
        typeof out[k] !== 'object' ||
        Array.isArray(out[k])) {
      continue
    }

    // see if the parent section is also an object.
    // if so, add it to that, and mark this one for deletion
    const parts: string[] = dotSplit(k)
    p = out
    const l: string = parts.pop()
    const nl: string = l.replace(/\\\./g, '.')
    for (const part of parts) {
      if (part === '__proto__') {
        continue
      }
      if (!hasOwnProperty.call(p, part) || typeof p[part] !== 'object') {
        p[part] = Object.create(null)
      }
      p = p[part]
    }
    if (p === out && nl === l) {
      continue
    }

    p[nl] = out[k]
    remove.push(k)
  }
  for (const del of remove) {
    delete out[del]
  }

  return out
}

const isQuoted: string = (val: any) => {
  return (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
}

const safe: any = (val: any) => {
  if (
    typeof val !== 'string' ||
    val.match(/[=\r\n]/) ||
    val.match(/^\[/) ||
    (val.length > 1 && isQuoted(val)) ||
    val !== val.trim()
  ) {
    return JSON.stringify(val)
  }
  return val.split(';').join('\\;').split('#').join('\\#')
}

const unsafe: any = (val: any, doUnesc: string) => {
  val = (val || '').trim()
  if (isQuoted(val)) {
    // remove the single quotes before calling JSON.parse
    if (val.charAt(0) === "'") {
      val = val.slice(1, -1)
    }
    try {
      val = JSON.parse(val)
    } catch {
      // ignore errors
    }
  } else {
    // walk the val to find the first not-escaped ; character
    let esc: boolean = false
    let unesc: string = ''
    for (let i = 0, l = val.length; i < l; i++) {
      const c: string = val.charAt(i)
      if (esc) {
        if ('\\;#'.indexOf(c) !== -1) {
          unesc += c
        } else {
          unesc += '\\' + c
        }

        esc = false
      } else if (';#'.indexOf(c) !== -1) {
        break
      } else if (c === '\\') {
        esc = true
      } else {
        unesc += c
      }
    }
    if (esc) {
      unesc += '\\'
    }

    return unesc.trim()
  }
  return val
}

export default {
  parse: decode,
  decode,
  stringify: encode,
  encode,
  safe,
  unsafe,
};
