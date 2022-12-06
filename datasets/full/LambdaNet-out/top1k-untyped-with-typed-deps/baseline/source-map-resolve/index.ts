var atob: Function = require("atob")
var urlLib: string = require("url")
var pathLib: string = require("path")
var decodeUriComponentLib: Function = require("decode-uri-component")



function resolveUrl(/* ...urls */): any[] {
  return Array.prototype.reduce.call(arguments, function(resolved: any[], nextUrl: string) {
    return urlLib.resolve(resolved, nextUrl)
  })
}

function convertWindowsPath(aPath: string): string {
  return pathLib.sep === "\\" ? aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/") : aPath
}

function customDecodeUriComponent(string: string): boolean {
  // `decodeUriComponentLib` turns `+` into ` `, but that's not wanted.
  return decodeUriComponentLib(string.replace(/\+/g, "%2B"))
}

function callbackAsync(callback: Function, error: object, result: string): void {
  setImmediate(function() { callback(error, result) })
}

function parseMapToJSON(string: string, data: object): any[] {
  try {
    return JSON.parse(string.replace(/^\)\]\}'/, ""))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}

function readSync(read: Function, url: string, data: object): number {
  var readUrl: string = customDecodeUriComponent(url)
  try {
    return String(read(readUrl))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}



var innerRegex: RegExp = /[#@] sourceMappingURL=([^\s'"]*)/

var sourceMappingURLRegex: string = RegExp(
  "(?:" +
    "/\\*" +
    "(?:\\s*\r?\n(?://)?)?" +
    "(?:" + innerRegex.source + ")" +
    "\\s*" +
    "\\*/" +
    "|" +
    "//(?:" + innerRegex.source + ")" +
  ")" +
  "\\s*"
)

function getSourceMappingUrl(code: string): string {
  var match: object = code.match(sourceMappingURLRegex)
  return match ? match[1] || match[2] || "" : null
}



function resolveSourceMap(code: string, codeUrl: string, read: Function, callback: Function): string {
  var mapData: object
  try {
    mapData = resolveSourceMapHelper(code, codeUrl)
  } catch (error) {
    return callbackAsync(callback, error)
  }
  if (!mapData || mapData.map) {
    return callbackAsync(callback, null, mapData)
  }
  var readUrl: string = customDecodeUriComponent(mapData.url)
  read(readUrl, function(error: object, result: Function) {
    if (error) {
      error.sourceMapData = mapData
      return callback(error)
    }
    mapData.map = String(result)
    try {
      mapData.map = parseMapToJSON(mapData.map, mapData)
    } catch (error) {
      return callback(error)
    }
    callback(null, mapData)
  })
}

function resolveSourceMapSync(code: string, codeUrl: string, read: string): object {
  var mapData: object = resolveSourceMapHelper(code, codeUrl)
  if (!mapData || mapData.map) {
    return mapData
  }
  mapData.map = readSync(read, mapData.url, mapData)
  mapData.map = parseMapToJSON(mapData.map, mapData)
  return mapData
}

var dataUriRegex: RegExp = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/

/**
 * The media type for JSON text is application/json.
 *
 * {@link https://tools.ietf.org/html/rfc8259#section-11 | IANA Considerations }
 *
 * `text/json` is non-standard media type
 */
var jsonMimeTypeRegex: RegExp = /^(?:application|text)\/json$/

/**
 * JSON text exchanged between systems that are not part of a closed ecosystem
 * MUST be encoded using UTF-8.
 *
 * {@link https://tools.ietf.org/html/rfc8259#section-8.1 | Character Encoding}
 */
var jsonCharacterEncoding: string = "utf-8"

function base64ToBuf(b64: string): object {
  var binStr: string = atob(b64)
  var len: number = binStr.length
  var arr: object = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  return arr
}

function decodeBase64String(b64: string): boolean {
  if (typeof TextDecoder === "undefined" || typeof Uint8Array === "undefined") {
    return atob(b64)
  }
  var buf: string = base64ToBuf(b64);
  // Note: `decoder.decode` method will throw a `DOMException` with the
  // `"EncodingError"` value when an coding error is found.
  var decoder: HTMLElement = new TextDecoder(jsonCharacterEncoding, {fatal: true})
  return decoder.decode(buf);
}

function resolveSourceMapHelper(code: string, codeUrl: string): object {
  codeUrl = convertWindowsPath(codeUrl)

  var url: string = getSourceMappingUrl(code)
  if (!url) {
    return null
  }

  var dataUri: object = url.match(dataUriRegex)
  if (dataUri) {
    var mimeType: number = dataUri[1] || "text/plain"
    var lastParameter: number = dataUri[2] || ""
    var encoded: string = dataUri[3] || ""
    var data: object = {
      sourceMappingURL: url,
      url: null,
      sourcesRelativeTo: codeUrl,
      map: encoded
    }
    if (!jsonMimeTypeRegex.test(mimeType)) {
      var error: Error = new Error("Unuseful data uri mime type: " + mimeType)
      error.sourceMapData = data
      throw error
    }
    try {
      data.map = parseMapToJSON(
        lastParameter === ";base64" ? decodeBase64String(encoded) : decodeURIComponent(encoded),
        data
      )
    } catch (error) {
      error.sourceMapData = data
      throw error
    }
    return data
  }

  var mapUrl: string = resolveUrl(codeUrl, url)
  return {
    sourceMappingURL: url,
    url: mapUrl,
    sourcesRelativeTo: mapUrl,
    map: null
  }
}



function resolveSources(map: HTMLElement, mapUrl: string, read: Function, options: object, callback: Function): void {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  var pending: number = map.sources ? map.sources.length : 0
  var result: object = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (pending === 0) {
    callbackAsync(callback, null, result)
    return
  }

  var done: Function = function() {
    pending--
    if (pending === 0) {
      callback(null, result)
    }
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl: string, sourceContent: string, index: string) {
    result.sourcesResolved[index] = fullUrl
    if (typeof sourceContent === "string") {
      result.sourcesContent[index] = sourceContent
      callbackAsync(done, null)
    } else {
      var readUrl: string = customDecodeUriComponent(fullUrl)
      read(readUrl, function(error: object, source: string) {
        result.sourcesContent[index] = error ? error : String(source)
        done()
      })
    }
  })
}

function resolveSourcesSync(map: HTMLElement, mapUrl: string, read: Function, options: object): HTMLElement {
  var result: object = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (!map.sources || map.sources.length === 0) {
    return result
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl: string, sourceContent: string, index: string) {
    result.sourcesResolved[index] = fullUrl
    if (read !== null) {
      if (typeof sourceContent === "string") {
        result.sourcesContent[index] = sourceContent
      } else {
        var readUrl: string = customDecodeUriComponent(fullUrl)
        try {
          result.sourcesContent[index] = String(read(readUrl))
        } catch (error) {
          result.sourcesContent[index] = error
        }
      }
    }
  })

  return result
}

var endingSlash: RegExp = /\/?$/

function resolveSourcesHelper(map: HTMLElement, mapUrl: string, options: object, fn: Function): void {
  options = options || {}
  mapUrl = convertWindowsPath(mapUrl)
  var fullUrl: string
  var sourceContent: Function
  var sourceRoot: string
  for (var index = 0, len = map.sources.length; index < len; index++) {
    sourceRoot = null
    if (typeof options.sourceRoot === "string") {
      sourceRoot = options.sourceRoot
    } else if (typeof map.sourceRoot === "string" && options.sourceRoot !== false) {
      sourceRoot = map.sourceRoot
    }
    // If the sourceRoot is the empty string, it is equivalent to not setting
    // the property at all.
    if (sourceRoot === null || sourceRoot === '') {
      fullUrl = resolveUrl(mapUrl, map.sources[index])
    } else {
      // Make sure that the sourceRoot ends with a slash, so that `/scripts/subdir` becomes
      // `/scripts/subdir/<source>`, not `/scripts/<source>`. Pointing to a file as source root
      // does not make sense.
      fullUrl = resolveUrl(mapUrl, sourceRoot.replace(endingSlash, "/"), map.sources[index])
    }
    sourceContent = (map.sourcesContent || [])[index]
    fn(fullUrl, sourceContent, index)
  }
}



function resolve(code: string, codeUrl: string, read: Function, options: Function, callback: Function): void {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  if (code === null) {
    var mapUrl: string = codeUrl
    var data: object = {
      sourceMappingURL: null,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
    var readUrl: string = customDecodeUriComponent(mapUrl)
    read(readUrl, function(error: object, result: Function) {
      if (error) {
        error.sourceMapData = data
        return callback(error)
      }
      data.map = String(result)
      try {
        data.map = parseMapToJSON(data.map, data)
      } catch (error) {
        return callback(error)
      }
      _resolveSources(data)
    })
  } else {
    resolveSourceMap(code, codeUrl, read, function(error: object, mapData: object) {
      if (error) {
        return callback(error)
      }
      if (!mapData) {
        return callback(null, null)
      }
      _resolveSources(mapData)
    })
  }

  function _resolveSources(mapData: object): void {
    resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function(error: object, result: HTMLElement) {
      if (error) {
        return callback(error)
      }
      mapData.sourcesResolved = result.sourcesResolved
      mapData.sourcesContent  = result.sourcesContent
      callback(null, mapData)
    })
  }
}

function resolveSync(code: string, codeUrl: string, read: string, options: object): HTMLElement {
  var mapData: object
  if (code === null) {
    var mapUrl: string = codeUrl
    mapData = {
      sourceMappingURL: null,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
    mapData.map = readSync(read, mapUrl, mapData)
    mapData.map = parseMapToJSON(mapData.map, mapData)
  } else {
    mapData = resolveSourceMapSync(code, codeUrl, read)
    if (!mapData) {
      return null
    }
  }
  var result: HTMLElement = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options)
  mapData.sourcesResolved = result.sourcesResolved
  mapData.sourcesContent  = result.sourcesContent
  return mapData
}



module.exports = {
  resolveSourceMap:     resolveSourceMap,
  resolveSourceMapSync: resolveSourceMapSync,
  resolveSources:       resolveSources,
  resolveSourcesSync:   resolveSourcesSync,
  resolve:              resolve,
  resolveSync:          resolveSync,
  parseMapToJSON:       parseMapToJSON
}
