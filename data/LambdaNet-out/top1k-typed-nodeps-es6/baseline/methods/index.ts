/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

import http from 'http';

/**
 * Module exports.
 * @public
 */

export default getCurrentNodeMethods() || getBasicNodeMethods();

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods (): Boolean {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod (method: String): String {
    return method.toLowerCase()
  })
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods (): Array {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ]
}
