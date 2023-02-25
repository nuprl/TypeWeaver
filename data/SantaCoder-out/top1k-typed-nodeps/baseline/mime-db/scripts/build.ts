/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var db = {}

// initialize with all the IANA types
addData(db, require('../src/iana-types.json'), 'iana')

// add the mime extensions from Apache
addData(db, require('../src/apache-types.json'), 'apache')

// add the mime extensions from nginx
addData(db, require('../src/nginx-types.json'), 'nginx')

// now add all our custom data
addData(db, require('../src/custom-types.json'))

// finally, all custom suffix defaults
var mime = require('../src/custom-suffix.json')
Object.keys(mime).forEach(function (suffix: string) {
  var s = mime[suffix]

  Object.keys(db).forEach(function (type: string) {
    if (type.slice(-suffix.length) !== suffix) {
      return
    }

    var d = db[type]
    if (d.compressible === undefined) d.compressible = s.compressible
  })
})

// write db
require('./lib/write-db')('db.json', db)

/**
 * Add mime data to the db, marked as a given source.
 */
function addData (db: IDatabase, mime: string, source: string) {
  Object.keys(mime).forEach(function (key: string) {
    var data = mime[key]
    var type = key.toLowerCase()
    var obj = db[type] = db[type] || createTypeEntry(source)

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
function appendExtension (obj: any, extension: string) {
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
function appendExtensions (obj: any, extensions: any) {
  if (!extensions) {
    return
  }

  for (var i = 0; i < extensions.length; i++) {
    var extension = extensions[i]

    // add extension to the type entry
    appendExtension(obj, extension)
  }
}

/**
 * Create a new type entry, optionally marked from a source.
 */
function createTypeEntry (source: string) {
  var obj = {}

  if (source !== undefined) {
    obj.source = source
  }

  return obj
}

/**
 * Set a value on an object, if not already set.
 */
function setValue (obj: any, prop: string, value: any) {
  if (value !== undefined && obj[prop] === undefined) {
    obj[prop] = value
  }
}