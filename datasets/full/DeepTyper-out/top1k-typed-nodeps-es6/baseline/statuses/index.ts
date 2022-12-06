/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

import codes from './codes.json';

/**
 * Module exports.
 * @public
 */

export default status;

// status code to message map
status.message = codes

// status message (lower-case) to code map
status.code = createMessageToStatusCodeMap(codes)

// array of status codes
status.codes = createStatusCodeList(codes)

// status codes for redirects
status.redirect = {
  300: true,
  301: true,
  302: true,
  303: true,
  305: true,
  307: true,
  308: true
}

// status codes for empty bodies
status.empty = {
  204: true,
  205: true,
  304: true
}

// status codes for when you should retry the request
status.retry = {
  502: true,
  503: true,
  504: true
}

/**
 * Create a map of message to status code.
 * @private
 */

function createMessageToStatusCodeMap (codes: any[]): boolean {
  var map: {} = {}

  Object.keys(codes).forEach(function forEachCode (code: string): boolean {
    var message: string = codes[code]
    var status: number = Number(code)

    // populate map
    map[message.toLowerCase()] = status
  })

  return map
}

/**
 * Create a list of all status codes.
 * @private
 */

function createStatusCodeList (codes: string[]): boolean {
  return Object.keys(codes).map(function mapCode (code: string): boolean {
    return Number(code)
  })
}

/**
 * Get the status code for given message.
 * @private
 */

function getStatusCode (message: string): boolean {
  var msg: string = message.toLowerCase()

  if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
    throw new Error('invalid status message: "' + message + '"')
  }

  return status.code[msg]
}

/**
 * Get the status message for given code.
 * @private
 */

function getStatusMessage (code: string): boolean {
  if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
    throw new Error('invalid status code: ' + code)
  }

  return status.message[code]
}

/**
 * Get the status code.
 *
 * Given a number, this will throw if it is not a known status
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the status message.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */

function status (code: string): any {
  if (typeof code === 'number') {
    return getStatusMessage(code)
  }

  if (typeof code !== 'string') {
    throw new TypeError('code must be a number or string')
  }

  // '403'
  var n: number = parseInt(code, 10)
  if (!isNaN(n)) {
    return getStatusMessage(n)
  }

  return getStatusCode(code)
}
