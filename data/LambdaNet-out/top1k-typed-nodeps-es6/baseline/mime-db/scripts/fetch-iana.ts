/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Convert the IANA definitions from CSV to local.
 */

global.Promise = global.Promise || loadBluebird()

import co from 'co';
import getRawBody from 'raw-body';
import cogent from 'cogent';
import parser from 'csv-parse';
import toArray from 'stream-to-array';
import typer from 'media-typer';
import writedb from './lib/write-db';

var extensionsQuotedRegExp: RegExp = /^\s*(?:\d\.\s+)?File extension(?:\(s\)|s|)\s?:(?:[^'"\r\n]+)(?:"\.?([0-9a-z_-]+)"|'\.?([0-9a-z_-]+)')/im
var leadingSpacesRegExp: RegExp = /^\s+/
var listColonRegExp: RegExp = /:(?:\s|$)/m
var nameWithNotesRegExp: RegExp = /^(\S+)(?: - (.*)$| \((.*)\)$|)/
var mimeTypeLineRegExp: RegExp = /^(?:\s*|[^:\s-]*\s+)(?:MIME type(?: name)?|MIME media type(?: name)?|Media type(?: name)?|Type name)\s?:\s+(.*)$/im
var mimeSubtypesLineRegExp: RegExp = /^[^:\s-]*\s*(?:MIME |Media )?subtype(?: names)?\s?:\s+(?:[a-z]+ Tree\s+(?:- ?)?)?(.*)$/im
var rfcReferenceRegExp: RegExp = /\[(RFC[0-9]{4})]/gi
var slurpModeRegExp: RegExp = /^\s{0,3}(?:[1-4]\. )?[a-z]{4,}(?: [a-z]{4,})+(?:s|\(s\))?\s*:\s*/i
var symbolRegExp: RegExp = /[._-]/g
var trimQuotesRegExp: RegExp = /^"|"$/gm
var urlReferenceRegExp: RegExp = /\[(https?:\/\/[^\]]+)]/gi

var CHARSET_DEFAULT_REGEXP: RegExp = /(?:\bcharset\b[^.]*(?:\.\s+default\s+(?:value\s+)?is|\bdefault[^.]*(?:of|is)|\bmust\s+have\s+the\s+value|\bvalue\s+must\s+be)\s+|\bcharset\s*\(?defaults\s+to\s+|\bdefault\b[^.]*?\bchar(?:set|act[eo]r\s+set)\b[^.]*?(?:of|is)\s+|\bcharset\s+(?:must|is)\s+always\s+(?:be\s+)?)["']?([a-z0-9]+-[a-z0-9-]+)/im
var EXTENSIONS_REGEXP: RegExp = /(?:^\s*(?:\d\.\s+)?|\s+[23]\.\s+)[Ff]ile [Ee]xtension(?:\(s\)|s|)\s?:\s+(?:\*\.|\.|)([0-9a-z_-]+|[0-9A-Z_-]+)(?:(?:\s+or|\s*,)\s+(?:\*\.|\.|)([0-9a-z_-]+|[0-9A-Z_-]+)\s*)?(?:\s*[34]\.\s+|\s+[A-Z(]|\s*$)/m
var INTENDED_USAGE_REGEXP: RegExp = /^\s*(?:(?:\d{1,2}\.|o)\s+)?Intended\s+Usage\s*:\s*([0-9a-z]+)/im
var MIME_SUBTYPE_LINE_REGEXP: RegExp = /^[^:\s-]*\s*(?:MIME )?(?:[Mm]edia )?(?:[Ss]ub ?type|SUB ?TYPE)(?: (?:[Nn]ame|NAME))?\s*:\s+(?:[A-Za-z]+ [Tt]ree\s+(?:- ?)?|(?:[a-z]+ )+- )?([0-9A-Za-z][0-9A-Za-z_.+-]*)(?:\s|$)/m
var MIME_TYPE_HAS_CHARSET_PARAMETER_REGEXP: RegExp = /parameters\s*:[^.]*\bcharset\b/im

co(function * () {
  var gens: any[] = yield [
    get('application', { extensions: /(?:\/(?:cwl|ecmascript|express|fdf|gzip|(?:ld|manifest)\+json|n-quads|n-triples|pgp-.+|trig|vnd\.(?:age|apple\..+|dbf|mapbox-vector-tile|rar))|xfdf|\+xml)$/ }),
    get('audio', { extensions: /\/(?:aac|mobile-xmf)$/ }),
    get('font', { extensions: true }),
    get('image', { extensions: true }),
    get('message', { extensions: true }),
    get('model', { extensions: true }),
    get('multipart'),
    get('text', { extensions: /\/(?:javascript|markdown|spdx|turtle|vnd\.familysearch\.gedcom|vtt)$/ }),
    get('video', { extensions: /\/iso\.segment$/ })
  ]

  // flatten generators
  gens = gens.reduce(concat, [])

  // get results in groups
  var results: any[] = []
  while (gens.length !== 0) {
    results.push(yield gens.splice(0, 10))
  }

  // flatten results
  results = results.reduce(concat, [])

  // gather extension frequency
  var exts: object = Object.create(null)
  results.forEach(function (result: object) {
    (result.extensions || []).forEach(function (ext: string) {
      exts[ext] = (exts[ext] || 0) + 1
    })
  })

  // construct json map
  var json: object = Object.create(null)
  results.forEach(function (result: object) {
    var mime: string = result.mime

    if (mime in json) {
      throw new Error('duplicate entry for ' + mime)
    }

    // skip obsoleted mimes
    if (result.usage === 'obsolete') {
      return
    }

    json[mime] = {
      charset: result.charset,
      notes: result.notes,
      sources: result.sources
    }

    // keep unambigious extensions
    var extensions: any[] = (result.extensions || []).filter(function (ext: string) {
      return exts[ext] === 1 || typer.parse(mime).subtype === ext
    })

    if (extensions.length !== 0) {
      json[mime].extensions = extensions
    }
  })

  writedb('src/iana-types.json', json)
}).then()

function addTemplateData (data: HTMLElement, options: object): Function {
  var opts: object = options || {}

  if (!data.template) {
    return data
  }

  return function * get (): string {
    var res: HTMLElement = yield * cogent('https://www.iana.org/assignments/media-types/' + data.template, { retries: 3 })
    var ref: number = data.type + '/' + data.name
    var rfc: string = getRfcReferences(data.reference)[0]

    if (res.statusCode === 404 && data.template !== ref) {
      console.log('template ' + data.template + ' not found, retry as ' + ref)
      data.template = ref
      res = yield * cogent('https://www.iana.org/assignments/media-types/' + ref, { retries: 3 })

      // replace the guessed mime
      if (res.statusCode === 200) {
        data.mime = data.template
      }
    }

    if (res.statusCode === 404 && rfc !== undefined) {
      console.log('template ' + data.template + ' not found, fetch ' + rfc)
      res = yield * cogent('https://tools.ietf.org/rfc/' + rfc.toLowerCase() + '.txt')
    }

    if (res.statusCode === 404) {
      console.log('template ' + data.template + ' not found')
      return data
    }

    if (res.statusCode !== 200) {
      throw new Error('got status code ' + res.statusCode + ' from template ' + data.template)
    }

    var body: string = yield getTemplateBody(res)
    var href: string = res.urls[0].href
    var mime: string = extractTemplateMime(body)

    // add the template as a source
    addSource(data, href)

    if (mimeEql(mime, data.mime)) {
      // use extracted mime
      data.mime = mime

      // use extracted charset
      data.charset = extractTemplateCharset(body)

      // use extracted usage
      data.usage = extractIntendedUsage(body)

      // use extracted extensions
      if (data.usage === 'common' && opts.extensions &&
        (opts.extensions === true || opts.extensions.test(data.mime))) {
        data.extensions = extractTemplateExtensions(body)
      }
    }

    return data
  }
}

function extractIntendedUsage (body: string): string {
  var match: object = INTENDED_USAGE_REGEXP.exec(body)

  return match
    ? match[1].toLocaleLowerCase()
    : undefined
}

function extractTemplateMime (body: string): number {
  var type: string = mimeTypeLineRegExp.exec(body)
  var subtype: any[] = MIME_SUBTYPE_LINE_REGEXP.exec(body)

  if (!subtype && (subtype = mimeSubtypesLineRegExp.exec(body)) && !/^[A-Za-z0-9.+-]+$/.test(subtype[1])) {
    return
  }

  if (!type || !subtype) {
    return
  }

  type = type[1].trim().replace(trimQuotesRegExp, '')
  subtype = subtype[1].trim().replace(trimQuotesRegExp, '')

  if (!subtype) {
    return
  }

  if (subtype.slice(0, type.length + 1) === type + '/') {
    // strip type from subtype
    subtype = subtype.slice(type.length + 1)
  }

  return (type + '/' + subtype).toLowerCase()
}

function extractTemplateCharset (body: string): string {
  if (!MIME_TYPE_HAS_CHARSET_PARAMETER_REGEXP.test(body)) {
    return undefined
  }

  var match: object = CHARSET_DEFAULT_REGEXP.exec(body)

  return match
    ? match[1].toUpperCase()
    : undefined
}

function extractTemplateExtensions (body: string): string {
  var match: any[] = EXTENSIONS_REGEXP.exec(body) || extensionsQuotedRegExp.exec(body)

  if (!match) {
    return
  }

  var exts: any[] = match
    .slice(1)
    .filter(Boolean)
    .map(function (ext: string) { return ext.toLowerCase() })
    .filter(function (ext: string) { return ext !== 'none' })

  return exts.length === 0
    ? undefined
    : exts
}

function * get (type: string, options: object): any[] {
  var res: HTMLElement = yield * cogent('https://www.iana.org/assignments/media-types/' + encodeURIComponent(type) + '.csv', { retries: 3 })

  if (res.statusCode !== 200) {
    throw new Error('got status code ' + res.statusCode + ' from ' + type)
  }

  var mimes: any[] = yield toArray(res.pipe(parser()))
  var headers: any[] = mimes.shift().map(normalizeHeader)
  var reduceRows: any[] = generateRowMapper(headers)
  var templates: object = Object.create(null)

  return mimes.map(function (row: any[]) {
    var data: HTMLElement = row.reduce(reduceRows, { type: type })

    if (data.template) {
      if (data.template === type + '/example') {
        return
      }

      if (templates[data.template]) {
        // duplicate entry
        return
      }

      templates[data.template] = true
    }

    // guess mime type
    data.mime = (data.template || (type + '/' + data.name)).toLowerCase()

    // extract notes from name
    var nameMatch: object = nameWithNotesRegExp.exec(data.name)
    data.name = nameMatch[1]
    data.notes = nameMatch[2] || nameMatch[3]

    // add reference sources
    parseReferences(data.reference).forEach(function (url: string) {
      addSource(data, url)
    })

    return addTemplateData(data, options)
  })
}

function * getTemplateBody (res: Function): string {
  var body: string = yield getRawBody(res, { encoding: 'ascii' })
  var lines: any[] = body.split(/\r?\n/)
  var slurp: boolean = false

  return lines.reduce(function (lines: any[], line: string) {
    line = line.replace(/=20$/, ' ')

    var prev: string = (lines[lines.length - 1] || '')
    var match: object = leadingSpacesRegExp.exec(line)

    if (slurp && line.trim().length === 0 && !/:\s*$/.test(prev)) {
      slurp = false
      return lines
    }

    if (slurpModeRegExp.test(line)) {
      slurp = false
      lines.push(line)
    } else if (slurp) {
      lines[lines.length - 1] = appendToLine(prev, line)
    } else if (match && match[0].length >= 3 && match[0].trim() !== 0 && prev.trim().length !== 0 && !listColonRegExp.test(line)) {
      lines[lines.length - 1] = appendToLine(prev, line)
    } else {
      lines.push(line)
    }

    // turn on slurp mode
    slurp = slurp || slurpModeRegExp.test(line)

    return lines
  }, []).join('\n')
}

function addSource (data: object, url: string): void {
  var sources: any[] = data.sources || (data.sources = [])

  if (sources.indexOf(url) === -1) {
    sources.push(url)
  }
}

function appendToLine (line: object, str: Function): string {
  var trimmed: string = line.trimRight()
  var append: string = trimmed.slice(-1) === '-'
    ? str.trimLeft()
    : ' ' + str.trimLeft()
  return trimmed + append
}

function concat (a: any[], b: any[]): any[] {
  return a.concat(b.filter(Boolean))
}

function generateRowMapper (headers: object): Function {
  return function reduceRows (obj: object, val: string, index: number): object {
    if (val !== '') {
      obj[headers[index]] = val
    }

    return obj
  }
}

function getRfcReferences (reference: string): any[] {
  var match: object = null
  var rfcs: any[] = []

  rfcReferenceRegExp.index = 0

  while ((match = rfcReferenceRegExp.exec(reference))) {
    rfcs.push(match[1].toUpperCase())
  }

  return rfcs
}

function getUrlReferences (reference: string): any[] {
  var match: object = null
  var urls: any[] = []

  urlReferenceRegExp.index = 0

  while ((match = urlReferenceRegExp.exec(reference))) {
    urls.push(match[1])
  }

  return urls
}

function loadBluebird (): any[] {
  var Promise: string = require('bluebird')

  // Silence all warnings
  Promise.config({
    warnings: false
  })

  return Promise
}

function mimeEql (mime1: string, mime2: string): boolean {
  return mime1 && mime2 &&
    mime1.replace(symbolRegExp, '-') === mime2.replace(symbolRegExp, '-')
}

function normalizeHeader (val: any[]): string {
  return val.slice(0, 1).toLowerCase() + val.slice(1).replace(/ (.)/, function (s: Function, c: string) {
    return c.toUpperCase()
  })
}

function parseReferences (reference: string): any[] {
  return getUrlReferences(reference).concat(getRfcReferences(reference).map(function (rfc: string) {
    return 'https://tools.ietf.org/rfc/' + rfc.toLowerCase() + '.txt'
  }))
}
