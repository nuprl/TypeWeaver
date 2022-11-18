/*!
 * media-typer
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * RegExp to match type in RFC 6838
 *
 * type-name = restricted-name
 * subtype-name = restricted-name
 * restricted-name = restricted-name-first *126restricted-name-chars
 * restricted-name-first  = ALPHA / DIGIT
 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
 *                          "$" / "&" / "-" / "^" / "_"
 * restricted-name-chars =/ "." ; Characters before first dot always
 *                              ; specify a facet name
 * restricted-name-chars =/ "+" ; Characters after last plus always
 *                              ; specify a structured syntax suffix
 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
 * DIGIT =  %x30-39             ; 0-9
 */
var SUBTYPE_NAME_REGEXP: RegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
var TYPE_NAME_REGEXP: RegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
var TYPE_REGEXP: RegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/

/**
 * Module exports.
 */

exports.format = format
exports.parse = parse
exports.test = test

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj: object): string {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var subtype: number = obj.subtype
  var suffix: string = obj.suffix
  var type: string = obj.type

  if (!type || !TYPE_NAME_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  if (!subtype || !SUBTYPE_NAME_REGEXP.test(subtype)) {
    throw new TypeError('invalid subtype')
  }

  // format as type/subtype
  var string: string = type + '/' + subtype

  // append +suffix
  if (suffix) {
    if (!TYPE_NAME_REGEXP.test(suffix)) {
      throw new TypeError('invalid suffix')
    }

    string += '+' + suffix
  }

  return string
}

/**
 * Test media type.
 *
 * @param {string} string
 * @return {object}
 * @public
 */

function test (string: string): boolean {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  return TYPE_REGEXP.test(string.toLowerCase())
}

/**
 * Parse media type to object.
 *
 * @param {string} string
 * @return {object}
 * @public
 */

function parse (string: string): string {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var match: object = TYPE_REGEXP.exec(string.toLowerCase())

  if (!match) {
    throw new TypeError('invalid media type')
  }

  var type: string = match[1]
  var subtype: string = match[2]
  var suffix: string

  // suffix after last +
  var index: number = subtype.lastIndexOf('+')
  if (index !== -1) {
    suffix = subtype.substr(index + 1)
    subtype = subtype.substr(0, index)
  }

  return new MediaType(type, subtype, suffix)
}

/**
 * Class for MediaType object.
 * @public
 */

function MediaType (type: string, subtype: string, suffix: string): Void {
  this.type = type
  this.subtype = subtype
  this.suffix = suffix
}
