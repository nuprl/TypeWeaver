/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

import { relative } from 'path';

/**
 * Module exports.
 */

export default depd;

/**
 * Get the path to base files on.
 */

var basePath: string = process.cwd()

/**
 * Determine if namespace is contained in the string.
 */

function containsNamespace (str: string, namespace: string): boolean {
  var vals: any[] = str.split(/[ ,]+/)
  var ns: string = String(namespace).toLowerCase()

  for (var i = 0; i < vals.length; i++) {
    var val: string = vals[i]

    // namespace contained
    if (val && (val === '*' || val.toLowerCase() === ns)) {
      return true
    }
  }

  return false
}

/**
 * Convert a data descriptor to accessor descriptor.
 */

function convertDataDescriptorToAccessor (obj: any[], prop: string, message: string): object {
  var descriptor: object = Object.getOwnPropertyDescriptor(obj, prop)
  var value: string = descriptor.value

  descriptor.get = function getter (): string { return value }

  if (descriptor.writable) {
    descriptor.set = function setter (val: string): boolean { return (value = val) }
  }

  delete descriptor.value
  delete descriptor.writable

  Object.defineProperty(obj, prop, descriptor)

  return descriptor
}

/**
 * Create arguments string to keep arity.
 */

function createArgumentsString (arity: string): string {
  var str: string = ''

  for (var i = 0; i < arity; i++) {
    str += ', arg' + i
  }

  return str.substr(2)
}

/**
 * Create stack string from stack.
 */

function createStackString (stack: any[]): string {
  var str: string = this.name + ': ' + this.namespace

  if (this.message) {
    str += ' deprecated ' + this.message
  }

  for (var i = 0; i < stack.length; i++) {
    str += '\n    at ' + stack[i].toString()
  }

  return str
}

/**
 * Create deprecate for namespace in caller.
 */

function depd (namespace: string): string {
  if (!namespace) {
    throw new TypeError('argument namespace is required')
  }

  var stack: object = getStack()
  var site: object = callSiteLocation(stack[1])
  var file: string = site[0]

  function deprecate (message: string): void {
    // call to self as log
    log.call(deprecate, message)
  }

  deprecate._file = file
  deprecate._ignored = isignored(namespace)
  deprecate._namespace = namespace
  deprecate._traced = istraced(namespace)
  deprecate._warned = Object.create(null)

  deprecate.function = wrapfunction
  deprecate.property = wrapproperty

  return deprecate
}

/**
 * Determine if event emitter has listeners of a given type.
 *
 * The way to do this check is done three different ways in Node.js >= 0.8
 * so this consolidates them into a minimal set using instance methods.
 *
 * @param {EventEmitter} emitter
 * @param {string} type
 * @returns {boolean}
 * @private
 */

function eehaslisteners (emitter: HTMLElement, type: string): boolean {
  var count: number = typeof emitter.listenerCount !== 'function'
    ? emitter.listeners(type).length
    : emitter.listenerCount(type)

  return count > 0
}

/**
 * Determine if namespace is ignored.
 */

function isignored (namespace: string): boolean {
  if (process.noDeprecation) {
    // --no-deprecation support
    return true
  }

  var str: string = process.env.NO_DEPRECATION || ''

  // namespace ignored
  return containsNamespace(str, namespace)
}

/**
 * Determine if namespace is traced.
 */

function istraced (namespace: string): boolean {
  if (process.traceDeprecation) {
    // --trace-deprecation support
    return true
  }

  var str: string = process.env.TRACE_DEPRECATION || ''

  // namespace traced
  return containsNamespace(str, namespace)
}

/**
 * Display deprecation message.
 */

function log (message: string, site: any[]): void {
  var haslisteners: boolean = eehaslisteners(process, 'deprecation')

  // abort early if no destination
  if (!haslisteners && this._ignored) {
    return
  }

  var caller: any[]
  var callFile: string
  var callSite: object
  var depSite: any[]
  var i: number = 0
  var seen: boolean = false
  var stack: any[] = getStack()
  var file: string = this._file

  if (site) {
    // provided site
    depSite = site
    callSite = callSiteLocation(stack[1])
    callSite.name = depSite.name
    file = callSite[0]
  } else {
    // get call site
    i = 2
    depSite = callSiteLocation(stack[i])
    callSite = depSite
  }

  // get caller of deprecated thing in relation to file
  for (; i < stack.length; i++) {
    caller = callSiteLocation(stack[i])
    callFile = caller[0]

    if (callFile === file) {
      seen = true
    } else if (callFile === this._file) {
      file = this._file
    } else if (seen) {
      break
    }
  }

  var key: string = caller
    ? depSite.join(':') + '__' + caller.join(':')
    : undefined

  if (key !== undefined && key in this._warned) {
    // already warned
    return
  }

  this._warned[key] = true

  // generate automatic message from call site
  var msg: string = message
  if (!msg) {
    msg = callSite === depSite || !callSite.name
      ? defaultMessage(depSite)
      : defaultMessage(callSite)
  }

  // emit deprecation if listeners exist
  if (haslisteners) {
    var err: string = DeprecationError(this._namespace, msg, stack.slice(i))
    process.emit('deprecation', err)
    return
  }

  // format and write message
  var format: Function = process.stderr.isTTY
    ? formatColor
    : formatPlain
  var output: string = format.call(this, msg, caller, stack.slice(i))
  process.stderr.write(output + '\n', 'utf8')
}

/**
 * Get call site location as array.
 */

function callSiteLocation (callSite: HTMLElement): any[] {
  var file: number = callSite.getFileName() || '<anonymous>'
  var line: string = callSite.getLineNumber()
  var colm: any[] = callSite.getColumnNumber()

  if (callSite.isEval()) {
    file = callSite.getEvalOrigin() + ', ' + file
  }

  var site: any[] = [file, line, colm]

  site.callSite = callSite
  site.name = callSite.getFunctionName()

  return site
}

/**
 * Generate a default message from the site.
 */

function defaultMessage (site: object): number {
  var callSite: HTMLInputElement = site.callSite
  var funcName: string = site.name

  // make useful anonymous name
  if (!funcName) {
    funcName = '<anonymous@' + formatLocation(site) + '>'
  }

  var context: object = callSite.getThis()
  var typeName: string = context && callSite.getTypeName()

  // ignore useless type name
  if (typeName === 'Object') {
    typeName = undefined
  }

  // make useful type name
  if (typeName === 'Function') {
    typeName = context.name || typeName
  }

  return typeName && callSite.getMethodName()
    ? typeName + '.' + funcName
    : funcName
}

/**
 * Format deprecation message without color.
 */

function formatPlain (msg: string, caller: number, stack: any[]): string {
  var timestamp: string = new Date().toUTCString()

  var formatted: string = timestamp +
    ' ' + this._namespace +
    ' deprecated ' + msg

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    at ' + stack[i].toString()
    }

    return formatted
  }

  if (caller) {
    formatted += ' at ' + formatLocation(caller)
  }

  return formatted
}

/**
 * Format deprecation message with color.
 */

function formatColor (msg: string, caller: number, stack: any[]): string {
  var formatted: string = '\x1b[36;1m' + this._namespace + '\x1b[22;39m' + // bold cyan
    ' \x1b[33;1mdeprecated\x1b[22;39m' + // bold yellow
    ' \x1b[0m' + msg + '\x1b[39m' // reset

  // add stack trace
  if (this._traced) {
    for (var i = 0; i < stack.length; i++) {
      formatted += '\n    \x1b[36mat ' + stack[i].toString() + '\x1b[39m' // cyan
    }

    return formatted
  }

  if (caller) {
    formatted += ' \x1b[36m' + formatLocation(caller) + '\x1b[39m' // cyan
  }

  return formatted
}

/**
 * Format call site location.
 */

function formatLocation (callSite: object): string {
  return relative(basePath, callSite[0]) +
    ':' + callSite[1] +
    ':' + callSite[2]
}

/**
 * Get the stack as array of call sites.
 */

function getStack (): any[] {
  var limit: boolean = Error.stackTraceLimit
  var obj: HTMLElement = {}
  var prep: object = Error.prepareStackTrace

  Error.prepareStackTrace = prepareObjectStackTrace
  Error.stackTraceLimit = Math.max(10, limit)

  // capture the stack
  Error.captureStackTrace(obj)

  // slice this function off the top
  var stack: any[] = obj.stack.slice(1)

  Error.prepareStackTrace = prep
  Error.stackTraceLimit = limit

  return stack
}

/**
 * Capture call site stack from v8.
 */

function prepareObjectStackTrace (obj: Function, stack: number): string {
  return stack
}

/**
 * Return a wrapped function in a deprecation message.
 */

function wrapfunction (fn: any[], message: string): object {
  if (typeof fn !== 'function') {
    throw new TypeError('argument fn must be a function')
  }

  var args: string = createArgumentsString(fn.length)
  var stack: object = getStack()
  var site: object = callSiteLocation(stack[1])

  site.name = fn.name

  // eslint-disable-next-line no-new-func
  var deprecatedfn: string = new Function('fn', 'log', 'deprecate', 'message', 'site',
    '"use strict"\n' +
    'return function (' + args + ') {' +
    'log.call(deprecate, message, site)\n' +
    'return fn.apply(this, arguments)\n' +
    '}')(fn, log, this, message, site)

  return deprecatedfn
}

/**
 * Wrap property in a deprecation message.
 */

function wrapproperty (obj: string, prop: string, message: string): void {
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
    throw new TypeError('argument obj must be object')
  }

  var descriptor: object = Object.getOwnPropertyDescriptor(obj, prop)

  if (!descriptor) {
    throw new TypeError('must call property on owner object')
  }

  if (!descriptor.configurable) {
    throw new TypeError('property must be configurable')
  }

  var deprecate: any[] = this
  var stack: object = getStack()
  var site: object = callSiteLocation(stack[1])

  // set site name
  site.name = prop

  // convert data descriptor
  if ('value' in descriptor) {
    descriptor = convertDataDescriptorToAccessor(obj, prop, message)
  }

  var get: Function = descriptor.get
  var set: Function = descriptor.set

  // wrap getter
  if (typeof get === 'function') {
    descriptor.get = function getter (): Promise {
      log.call(deprecate, message, site)
      return get.apply(this, arguments)
    }
  }

  // wrap setter
  if (typeof set === 'function') {
    descriptor.set = function setter (): Promise {
      log.call(deprecate, message, site)
      return set.apply(this, arguments)
    }
  }

  Object.defineProperty(obj, prop, descriptor)
}

/**
 * Create DeprecationError for deprecation
 */

function DeprecationError (namespace: string, message: string, stack: string): object {
  var error: Error = new Error()
  var stackString: string

  Object.defineProperty(error, 'constructor', {
    value: DeprecationError
  })

  Object.defineProperty(error, 'message', {
    configurable: true,
    enumerable: false,
    value: message,
    writable: true
  })

  Object.defineProperty(error, 'name', {
    enumerable: false,
    configurable: true,
    value: 'DeprecationError',
    writable: true
  })

  Object.defineProperty(error, 'namespace', {
    configurable: true,
    enumerable: false,
    value: namespace,
    writable: true
  })

  Object.defineProperty(error, 'stack', {
    configurable: true,
    enumerable: false,
    get: function () {
      if (stackString !== undefined) {
        return stackString
      }

      // prepare stack trace
      return (stackString = createStackString.call(this, stack))
    },
    set: function setter (val: number): void {
      stackString = val
    }
  })

  return error
}
