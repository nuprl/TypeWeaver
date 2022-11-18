var parse: Function = require('url').parse
var events: string = require('events')
var https: string = require('https')
var http: string = require('http')
var util: string = require('util')

var httpsOptions: any[] = [
  'pfx', 'key', 'passphrase', 'cert', 'ca', 'ciphers',
  'rejectUnauthorized', 'secureProtocol', 'servername', 'checkServerIdentity'
]

var bom: any[] = [239, 187, 191]
var colon: number = 58
var space: number = 32
var lineFeed: number = 10
var carriageReturn: number = 13
// Beyond 256KB we could not observe any gain in performance
var maxBufferAheadAllocation: number = 1024 * 256
// Headers matching the pattern should be removed when redirecting to different origin
var reUnsafeHeader: RegExp = /^(cookie|authorization)$/i

function hasBom (buf: object): boolean {
  return bom.every(function (charCode: string, index: number) {
    return buf[index] === charCode
  })
}

/**
 * Creates a new EventSource object
 *
 * @param {String} url the URL to which to connect
 * @param {Object} [eventSourceInitDict] extra init params. See README for details.
 * @api public
 **/
function EventSource (url: string, eventSourceInitDict: object): Void {
  var readyState: number = EventSource.CONNECTING
  var headers: object = eventSourceInitDict && eventSourceInitDict.headers
  var hasNewOrigin: boolean = false
  Object.defineProperty(this, 'readyState', {
    get: function () {
      return readyState
    }
  })

  Object.defineProperty(this, 'url', {
    get: function () {
      return url
    }
  })

  var self: HTMLElement = this
  self.reconnectInterval = 1000
  self.connectionInProgress = false

  function onConnectionClosed (message: string): Void {
    if (readyState === EventSource.CLOSED) return
    readyState = EventSource.CONNECTING
    _emit('error', new Event('error', {message: message}))

    // The url may have been changed by a temporary redirect. If that's the case,
    // revert it now, and flag that we are no longer pointing to a new origin
    if (reconnectUrl) {
      url = reconnectUrl
      reconnectUrl = null
      hasNewOrigin = false
    }
    setTimeout(function () {
      if (readyState !== EventSource.CONNECTING || self.connectionInProgress) {
        return
      }
      self.connectionInProgress = true
      connect()
    }, self.reconnectInterval)
  }

  var req: HTMLElement
  var lastEventId: string = ''
  if (headers && headers['Last-Event-ID']) {
    lastEventId = headers['Last-Event-ID']
    delete headers['Last-Event-ID']
  }

  var discardTrailingNewline: boolean = false
  var data: string = ''
  var eventName: string = ''

  var reconnectUrl: string = null

  function connect (): Void {
    var options: object = parse(url)
    var isSecure: boolean = options.protocol === 'https:'
    options.headers = { 'Cache-Control': 'no-cache', 'Accept': 'text/event-stream' }
    if (lastEventId) options.headers['Last-Event-ID'] = lastEventId
    if (headers) {
      var reqHeaders: Promise = hasNewOrigin ? removeUnsafeHeaders(headers) : headers
      for (var i in reqHeaders) {
        var header: string = reqHeaders[i]
        if (header) {
          options.headers[i] = header
        }
      }
    }

    // Legacy: this should be specified as `eventSourceInitDict.https.rejectUnauthorized`,
    // but for now exists as a backwards-compatibility layer
    options.rejectUnauthorized = !(eventSourceInitDict && !eventSourceInitDict.rejectUnauthorized)

    if (eventSourceInitDict && eventSourceInitDict.createConnection !== undefined) {
      options.createConnection = eventSourceInitDict.createConnection
    }

    // If specify http proxy, make the request to sent to the proxy server,
    // and include the original url in path and Host headers
    var useProxy: boolean = eventSourceInitDict && eventSourceInitDict.proxy
    if (useProxy) {
      var proxy: HTMLElement = parse(eventSourceInitDict.proxy)
      isSecure = proxy.protocol === 'https:'

      options.protocol = isSecure ? 'https:' : 'http:'
      options.path = url
      options.headers.Host = options.host
      options.hostname = proxy.hostname
      options.host = proxy.host
      options.port = proxy.port
    }

    // If https options are specified, merge them into the request options
    if (eventSourceInitDict && eventSourceInitDict.https) {
      for (var optName in eventSourceInitDict.https) {
        if (httpsOptions.indexOf(optName) === -1) {
          continue
        }

        var option: string = eventSourceInitDict.https[optName]
        if (option !== undefined) {
          options[optName] = option
        }
      }
    }

    // Pass this on to the XHR
    if (eventSourceInitDict && eventSourceInitDict.withCredentials !== undefined) {
      options.withCredentials = eventSourceInitDict.withCredentials
    }

    req = (isSecure ? https : http).request(options, function (res: HTMLElement) {
      self.connectionInProgress = false
      // Handle HTTP errors
      if (res.statusCode === 500 || res.statusCode === 502 || res.statusCode === 503 || res.statusCode === 504) {
        _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
        onConnectionClosed()
        return
      }

      // Handle HTTP redirects
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        var location: string = res.headers.location
        if (!location) {
          // Server sent redirect response without Location header.
          _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
          return
        }
        var prevOrigin: string = new URL(url).origin
        var nextOrigin: string = new URL(location).origin
        hasNewOrigin = prevOrigin !== nextOrigin
        if (res.statusCode === 307) reconnectUrl = url
        url = location
        process.nextTick(connect)
        return
      }

      if (res.statusCode !== 200) {
        _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
        return self.close()
      }

      readyState = EventSource.OPEN
      res.on('close', function () {
        res.removeAllListeners('close')
        res.removeAllListeners('end')
        onConnectionClosed()
      })

      res.on('end', function () {
        res.removeAllListeners('close')
        res.removeAllListeners('end')
        onConnectionClosed()
      })
      _emit('open', new Event('open'))

      // text/event-stream parser adapted from webkit's
      // Source/WebCore/page/EventSource.cpp
      var buf: any[]
      var newBuffer: any[]
      var startingPos: number = 0
      var startingFieldLength: number = -1
      var newBufferSize: number = 0
      var bytesUsed: number = 0

      res.on('data', function (chunk: any[]) {
        if (!buf) {
          buf = chunk
          if (hasBom(buf)) {
            buf = buf.slice(bom.length)
          }
          bytesUsed = buf.length
        } else {
          if (chunk.length > buf.length - bytesUsed) {
            newBufferSize = (buf.length * 2) + chunk.length
            if (newBufferSize > maxBufferAheadAllocation) {
              newBufferSize = buf.length + chunk.length + maxBufferAheadAllocation
            }
            newBuffer = Buffer.alloc(newBufferSize)
            buf.copy(newBuffer, 0, 0, bytesUsed)
            buf = newBuffer
          }
          chunk.copy(buf, bytesUsed)
          bytesUsed += chunk.length
        }

        var pos: number = 0
        var length: number = bytesUsed

        while (pos < length) {
          if (discardTrailingNewline) {
            if (buf[pos] === lineFeed) {
              ++pos
            }
            discardTrailingNewline = false
          }

          var lineLength: number = -1
          var fieldLength: number = startingFieldLength
          var c: number

          for (var i = startingPos; lineLength < 0 && i < length; ++i) {
            c = buf[i]
            if (c === colon) {
              if (fieldLength < 0) {
                fieldLength = i - pos
              }
            } else if (c === carriageReturn) {
              discardTrailingNewline = true
              lineLength = i - pos
            } else if (c === lineFeed) {
              lineLength = i - pos
            }
          }

          if (lineLength < 0) {
            startingPos = length - pos
            startingFieldLength = fieldLength
            break
          } else {
            startingPos = 0
            startingFieldLength = -1
          }

          parseEventStreamLine(buf, pos, fieldLength, lineLength)

          pos += lineLength + 1
        }

        if (pos === length) {
          buf = void 0
          bytesUsed = 0
        } else if (pos > 0) {
          buf = buf.slice(pos, bytesUsed)
          bytesUsed = buf.length
        }
      })
    })

    req.on('error', function (err: object) {
      self.connectionInProgress = false
      onConnectionClosed(err.message)
    })

    if (req.setNoDelay) req.setNoDelay(true)
    req.end()
  }

  connect()

  function _emit (): Void {
    if (self.listeners(arguments[0]).length > 0) {
      self.emit.apply(self, arguments)
    }
  }

  this._close = function () {
    if (readyState === EventSource.CLOSED) return
    readyState = EventSource.CLOSED
    if (req.abort) req.abort()
    if (req.xhr && req.xhr.abort) req.xhr.abort()
  }

  function parseEventStreamLine (buf: any[], pos: string, fieldLength: number, lineLength: number): Void {
    if (lineLength === 0) {
      if (data.length > 0) {
        var type: string = eventName || 'message'
        _emit(type, new MessageEvent(type, {
          data: data.slice(0, -1), // remove trailing newline
          lastEventId: lastEventId,
          origin: new URL(url).origin
        }))
        data = ''
      }
      eventName = void 0
    } else if (fieldLength > 0) {
      var noValue: boolean = fieldLength < 0
      var step: number = 0
      var field: string = buf.slice(pos, pos + (noValue ? lineLength : fieldLength)).toString()

      if (noValue) {
        step = lineLength
      } else if (buf[pos + fieldLength + 1] !== space) {
        step = fieldLength + 1
      } else {
        step = fieldLength + 2
      }
      pos += step

      var valueLength: number = lineLength - step
      var value: string = buf.slice(pos, pos + valueLength).toString()

      if (field === 'data') {
        data += value + '\n'
      } else if (field === 'event') {
        eventName = value
      } else if (field === 'id') {
        lastEventId = value
      } else if (field === 'retry') {
        var retry: number = parseInt(value, 10)
        if (!Number.isNaN(retry)) {
          self.reconnectInterval = retry
        }
      }
    }
  }
}

module.exports = EventSource

util.inherits(EventSource, events.EventEmitter)
EventSource.prototype.constructor = EventSource; // make stacktraces readable

['open', 'error', 'message'].forEach(function (method: string) {
  Object.defineProperty(EventSource.prototype, 'on' + method, {
    /**
     * Returns the current listener
     *
     * @return {Mixed} the set function or undefined
     * @api private
     */
    get: function get (): string {
      var listener: string = this.listeners(method)[0]
      return listener ? (listener._listener ? listener._listener : listener) : undefined
    },

    /**
     * Start listening for events
     *
     * @param {Function} listener the listener
     * @return {Mixed} the set function or undefined
     * @api private
     */
    set: function set (listener: string): Void {
      this.removeAllListeners(method)
      this.addEventListener(method, listener)
    }
  })
})

/**
 * Ready states
 */
Object.defineProperty(EventSource, 'CONNECTING', {enumerable: true, value: 0})
Object.defineProperty(EventSource, 'OPEN', {enumerable: true, value: 1})
Object.defineProperty(EventSource, 'CLOSED', {enumerable: true, value: 2})

EventSource.prototype.CONNECTING = 0
EventSource.prototype.OPEN = 1
EventSource.prototype.CLOSED = 2

/**
 * Closes the connection, if one is made, and sets the readyState attribute to 2 (closed)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close
 * @api public
 */
EventSource.prototype.close = function () {
  this._close()
}

/**
 * Emulates the W3C Browser based WebSocket interface using addEventListener.
 *
 * @param {String} type A string representing the event type to listen out for
 * @param {Function} listener callback
 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
EventSource.prototype.addEventListener = function addEventListener (type: string, listener: Function): Void {
  if (typeof listener === 'function') {
    // store a reference so we can return the original function again
    listener._listener = listener
    this.on(type, listener)
  }
}

/**
 * Emulates the W3C Browser based WebSocket interface using dispatchEvent.
 *
 * @param {Event} event An event to be dispatched
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
 * @api public
 */
EventSource.prototype.dispatchEvent = function dispatchEvent (event: object): Void {
  if (!event.type) {
    throw new Error('UNSPECIFIED_EVENT_TYPE_ERR')
  }

  this.emit(event.type, event)
}

/**
 * Emulates the W3C Browser based WebSocket interface using removeEventListener.
 *
 * @param {String} type A string representing the event type to remove
 * @param {Function} listener callback
 * @see https://developer.mozilla.org/en/DOM/element.removeEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
EventSource.prototype.removeEventListener = function removeEventListener (type: string, listener: string): Void {
  if (typeof listener === 'function') {
    listener._listener = undefined
    this.removeListener(type, listener)
  }
}

/**
 * W3C Event
 *
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event
 * @api private
 */
function Event (type: string, optionalProperties: object): Void {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true })
  if (optionalProperties) {
    for (var f in optionalProperties) {
      if (optionalProperties.hasOwnProperty(f)) {
        Object.defineProperty(this, f, { writable: false, value: optionalProperties[f], enumerable: true })
      }
    }
  }
}

/**
 * W3C MessageEvent
 *
 * @see http://www.w3.org/TR/webmessaging/#event-definitions
 * @api private
 */
function MessageEvent (type: string, eventInitDict: object): Void {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true })
  for (var f in eventInitDict) {
    if (eventInitDict.hasOwnProperty(f)) {
      Object.defineProperty(this, f, { writable: false, value: eventInitDict[f], enumerable: true })
    }
  }
}

/**
 * Returns a new object of headers that does not include any authorization and cookie headers
 *
 * @param {Object} headers An object of headers ({[headerName]: headerValue})
 * @return {Object} a new object of headers
 * @api private
 */
function removeUnsafeHeaders (headers: object): object {
  var safe: object = {}
  for (var key in headers) {
    if (reUnsafeHeader.test(key)) {
      continue
    }

    safe[key] = headers[key]
  }

  return safe
}
