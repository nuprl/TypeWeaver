/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var db: Object = {}

// initialize with all the IANA types
addData(db, require('../src/iana-types.json'), 'iana')

// add the mime extensions from Apache
addData(db, require('../src/apache-types.json'), 'apache')

// add the mime extensions from nginx
addData(db, require('../src/nginx-types.json'), 'nginx')

// now add all our custom data
addData(db, require('../src/custom-types.json'))

// finally, all custom suffix defaults
import mime from '../src/custom-suffix.json';

Object.keys(mime).forEach(function (suffix: Array) {
  var s: HTMLElement = mime[suffix]

  Object.keys(db).forEach(function (type: Array) {
    if (type.slice(-suffix.length) !== suffix) {
      return
    }

    var d: HTMLElement = db[type]
    if (d.compressible === undefined) d.compressible = s.compressible
  })
})

// write db
require('./lib/write-db')('db.json', db)

/**
 * Add mime data to the db, marked as a given source.
 */
function addData (db: Object, mime: Object, source: String): Void {
  Object.keys(mime).forEach(function (key: String) {
    var data: Object = mime[key]
    var type: String = key.toLowerCase()
    var obj: String = db[type] = db[type] || createTypeEntry(source)

    // add missing data
    setValue(obj, 'charset', data.charset)
    setValue(obj, 'compressible', data.compressible)

    // append new extensions
    appendExtensions(obj, data.extensions)
  })
}

/**
 * Append an extension to an object.
 */
function appendExtension (obj: Object, extension: String): Void {
  if (!obj.extensions) {
    obj.extensions = []
  }

  if (obj.extensions.indexOf(extension) === -1) {
    obj.extensions.push(extension)
  }
}

/**
 * Append extensions to an object.
 */
function appendExtensions (obj: String, extensions: Array): Void {
  if (!extensions) {
    return
  }

  for (var i = 0; i < extensions.length; i++) {
    var extension: String = extensions[i]

    // add extension to the type entry
    appendExtension(obj, extension)
  }
}

/**
 * Create a new type entry, optionally marked from a source.
 */
function createTypeEntry (source: Number): Object {
  var obj: Object = {}

  if (source !== undefined) {
    obj.source = source
  }

  return obj
}

/**
 * Set a value on an object, if not already set.
 */
function setValue (obj: Object, prop: String, value: String): Void {
  if (value !== undefined && obj[prop] === undefined) {
    obj[prop] = value
  }
}
