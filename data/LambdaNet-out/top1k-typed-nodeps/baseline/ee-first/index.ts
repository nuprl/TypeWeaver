/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = first

/**
 * Get the first event in a set of event emitters and event pairs.
 *
 * @param {array} stuff
 * @param {function} done
 * @public
 */

function first (stuff: any[], done: Function): any[] {
  if (!Array.isArray(stuff)) {
    throw new TypeError('arg must be an array of [ee, events...] arrays')
  }

  var cleanups: any[] = []

  for (var i = 0; i < stuff.length; i++) {
    var arr: any[] = stuff[i]

    if (!Array.isArray(arr) || arr.length < 2) {
      throw new TypeError('each array member must be [ee, events...]')
    }

    var ee: object = arr[0]

    for (var j = 1; j < arr.length; j++) {
      var event: string = arr[j]
      var fn: Function = listener(event, callback)

      // listen to the event
      ee.on(event, fn)
      // push this listener to the list of cleanups
      cleanups.push({
        ee: ee,
        event: event,
        fn: fn
      })
    }
  }

  function callback (): void {
    cleanup()
    done.apply(null, arguments)
  }

  function cleanup (): void {
    var x: object
    for (var i = 0; i < cleanups.length; i++) {
      x = cleanups[i]
      x.ee.removeListener(x.event, x.fn)
    }
  }

  function thunk (fn: any[]): void {
    done = fn
  }

  thunk.cancel = cleanup

  return thunk
}

/**
 * Create the event listener.
 * @private
 */

function listener (event: string, done: Function): Function {
  return function onevent (arg1: string): void {
    var args: any[] = new Array(arguments.length)
    var ee: any[] = this
    var err: string = event === 'error'
      ? arg1
      : null

    // copy args to prevent arguments escaping scope
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }

    done(err, ee, event, args)
  }
}
