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

import db from 'mime-db';

/**
 * Module variables.
 * @private
 */

var COMPRESSIBLE_TYPE_REGEXP: RegExp = /^text\/|\+(?:json|text|xml)$/i
var EXTRACT_TYPE_REGEXP: RegExp = /^\s*([^;\s]*)(?:;|\s|$)/

/**
 * Module exports.
 * @public
 */

export default compressible;

/**
 * Checks if a type is compressible.
 *
 * @param {string} type
 * @return {Boolean} compressible
 * @public
 */

function compressible (type: string): boolean {
  if (!type || typeof type !== 'string') {
    return false
  }

  // strip parameters
  var match: object = EXTRACT_TYPE_REGEXP.exec(type)
  var mime: number = match && match[1].toLowerCase()
  var data: Element = db[mime]

  // return database information
  if (data && data.compressible !== undefined) {
    return data.compressible
  }

  // fallback to regexp or unknown
  return COMPRESSIBLE_TYPE_REGEXP.test(mime) || undefined
}
