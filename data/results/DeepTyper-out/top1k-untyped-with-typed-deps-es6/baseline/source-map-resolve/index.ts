import atob from 'atob';
import urlLib from 'url';
import pathLib from 'path';
import decodeUriComponentLib from 'decode-uri-component';



function resolveUrl(/* ...urls */): any {
  return Array.prototype.reduce.call(arguments, function(resolved: any, nextUrl: string) {
    return urlLib.resolve(resolved, nextUrl)
  })
}

function convertWindowsPath(aPath: string): string {
  return pathLib.sep === "\\" ? aPath.replace(/\\/g, "/").replace(/^[a-z]:\/?/i, "/") : aPath
}

function customDecodeUriComponent(string): string {
  // `decodeUriComponentLib` turns `+` into ` `, but that's not wanted.
  return decodeUriComponentLib(string.replace(/\+/g, "%2B"))
}

function callbackAsync(callback: any, error: any, result: any): void {
  setImmediate(function() { callback(error, result) })
}

function parseMapToJSON(string, data: any): string {
  try {
    return JSON.parse(string.replace(/^\)\]\}'/, ""))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}

function readSync(read: any, url: string, data: any): any {
  var readUrl: any = customDecodeUriComponent(url)
  try {
    return String(read(readUrl))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}



var innerRegex: RegExp = /[#@] sourceMappingURL=([^\s'"]*)/

var sourceMappingURLRegex: RegExp = RegExp(
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
  var match: any = code.match(sourceMappingURLRegex)
  return match ? match[1] || match[2] || "" : null
}



function resolveSourceMap(code: string, codeUrl: string, read: any, callback: Function): any {
  var mapData: any
  try {
    mapData = resolveSourceMapHelper(code, codeUrl)
  } catch (error) {
    return callbackAsync(callback, error)
  }
  if (!mapData || mapData.map) {
    return callbackAsync(callback, null, mapData)
  }
  var readUrl: any = customDecodeUriComponent(mapData.url)
  read(readUrl, function(error: any, result: any) {
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

function resolveSourceMapSync(code: string, codeUrl: string, read: any): any {
  var mapData: any = resolveSourceMapHelper(code, codeUrl)
  if (!mapData || mapData.map) {
    return mapData
  }
  mapData.map = readSync(read, mapData.url, mapData)
  mapData.map = parseMapToJSON(mapData.map, mapData)
  return mapData
}

var dataUriRegex: string = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/

/**
 * The media type for JSON text is application/json.
 *
 * {@link https://tools.ietf.org/html/rfc8259#section-11 | IANA Considerations }
 *
 * `text/json` is non-standard media type
 */
var jsonMimeTypeRegex: string = /^(?:application|text)\/json$/

/**
 * JSON text exchanged between systems that are not part of a closed ecosystem
 * MUST be encoded using UTF-8.
 *
 * {@link https://tools.ietf.org/html/rfc8259#section-8.1 | Character Encoding}
 */
var jsonCharacterEncoding: string = "utf-8"

function base64ToBuf(b64: string): string {
  var binStr: string = atob(b64)
  var len: number = binStr.length
  var arr: any = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  return arr
}

function decodeBase64String(b64: any): any {
  if (typeof TextDecoder === "undefined" || typeof Uint8Array === "undefined") {
    return atob(b64)
  }
  var buf: any = base64ToBuf(b64);
  // Note: `decoder.decode` method will throw a `DOMException` with the
  // `"EncodingError"` value when an coding error is found.
  var decoder: any = new TextDecoder(jsonCharacterEncoding, {fatal: true})
  return decoder.decode(buf);
}

function resolveSourceMapHelper(code: string, codeUrl: string): any {
  codeUrl = convertWindowsPath(codeUrl)

  var url: string = getSourceMappingUrl(code)
  if (!url) {
    return null
  }

  var dataUri: any = url.match(dataUriRegex)
  if (dataUri) {
    var mimeType: any = dataUri[1] || "text/plain"
    var lastParameter: any = dataUri[2] || ""
    var encoded: string = dataUri[3] || ""
    var data: any = {
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

  var mapUrl: any = resolveUrl(codeUrl, url)
  return {
    sourceMappingURL: url,
    url: mapUrl,
    sourcesRelativeTo: mapUrl,
    map: null
  }
}



function resolveSources(map: any, mapUrl: any, read: any, options: any, callback: any): any {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  var pending: any = map.sources ? map.sources.length : 0
  var result: any = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (pending === 0) {
    callbackAsync(callback, null, result)
    return
  }

  var done: void = function() {
    pending--
    if (pending === 0) {
      callback(null, result)
    }
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl: any, sourceContent: any, index: number) {
    result.sourcesResolved[index] = fullUrl
    if (typeof sourceContent === "string") {
      result.sourcesContent[index] = sourceContent
      callbackAsync(done, null)
    } else {
      var readUrl: any = customDecodeUriComponent(fullUrl)
      read(readUrl, function(error: any, source: any) {
        result.sourcesContent[index] = error ? error : String(source)
        done()
      })
    }
  })
}

function resolveSourcesSync(map: any, mapUrl: any, read: any, options: any): any {
  var result: any = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (!map.sources || map.sources.length === 0) {
    return result
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl: any, sourceContent: any, index: number) {
    result.sourcesResolved[index] = fullUrl
    if (read !== null) {
      if (typeof sourceContent === "string") {
        result.sourcesContent[index] = sourceContent
      } else {
        var readUrl: any = customDecodeUriComponent(fullUrl)
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

var endingSlash: string = /\/?$/

function resolveSourcesHelper(map: any, mapUrl: any, options: any, fn: any): void {
  options = options || {}
  mapUrl = convertWindowsPath(mapUrl)
  var fullUrl: any
  var sourceContent: any
  var sourceRoot: any
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



function resolve(code: string, codeUrl: any, read: any, options: any, callback: any): any {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  if (code === null) {
    var mapUrl: any = codeUrl
    var data: any = {
      sourceMappingURL: null,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
    var readUrl: any = customDecodeUriComponent(mapUrl)
    read(readUrl, function(error: any, result: any) {
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
    resolveSourceMap(code, codeUrl, read, function(error: any, mapData: any) {
      if (error) {
        return callback(error)
      }
      if (!mapData) {
        return callback(null, null)
      }
      _resolveSources(mapData)
    })
  }

  function _resolveSources(mapData: any): any {
    resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function(error: any, result: any) {
      if (error) {
        return callback(error)
      }
      mapData.sourcesResolved = result.sourcesResolved
      mapData.sourcesContent  = result.sourcesContent
      callback(null, mapData)
    })
  }
}

function resolveSync(code: string, codeUrl: any, read: any, options: any): any {
  var mapData: any
  if (code === null) {
    var mapUrl: any = codeUrl
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
  var result: any = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options)
  mapData.sourcesResolved = result.sourcesResolved
  mapData.sourcesContent  = result.sourcesContent
  return mapData
}



export default {
  resolveSourceMap:     resolveSourceMap,
  resolveSourceMapSync: resolveSourceMapSync,
  resolveSources:       resolveSources,
  resolveSourcesSync:   resolveSourcesSync,
  resolve:              resolve,
  resolveSync:          resolveSync,
  parseMapToJSON:       parseMapToJSON
};
