/*!
 * compressible
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Jeremiah Senkpiel
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var db: any = require('mime-db')

/**
 * Module variables.
 * @private
 */

var COMPRESSIBLE_TYPE_REGEXP: string = /^text\/|\+(?:json|text|xml)$/i
var EXTRACT_TYPE_REGEXP: string = /^\s*([^;\s]*)(?:;|\s|$)/

/**
 * Module exports.
 * @public
 */

module.exports = compressible

/**
 * Checks if a type is compressible.
 *
 * @param {string} type
 * @return {Boolean} compressible
 * @public
 */

function compressible (type): boolean {
  if (!type || typeof type !== 'string') {
    return false
  }

  // strip parameters
  var match: RegExpExecArray = EXTRACT_TYPE_REGEXP.exec(type)
  var mime: any = match && match[1].toLowerCase()
  var data: any = db[mime]

  // return database information
  if (data && data.compressible !== undefined) {
    return data.compressible
  }

  // fallback to regexp or unknown
  return COMPRESSIBLE_TYPE_REGEXP.test(mime) || undefined
}
