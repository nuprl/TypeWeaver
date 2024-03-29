/*!
 * forwarded
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

export default forwarded;

/**
 * Get all addresses in the request, using the `X-Forwarded-For` header.
 *
 * @param {object} req
 * @return {array}
 * @public
 */

function forwarded (req: object): any[] {
  if (!req) {
    throw new TypeError('argument req is required')
  }

  // simple header parsing
  var proxyAddrs: any[] = parse(req.headers['x-forwarded-for'] || '')
  var socketAddr: object = getSocketAddr(req)
  var addrs: any[] = [socketAddr].concat(proxyAddrs)

  // return all addresses
  return addrs
}

/**
 * Get the socket address for a request.
 *
 * @param {object} req
 * @return {string}
 * @private
 */

function getSocketAddr (req: object): string {
  return req.socket
    ? req.socket.remoteAddress
    : req.connection.remoteAddress
}

/**
 * Parse the X-Forwarded-For header.
 *
 * @param {string} header
 * @private
 */

function parse (header: string): any[] {
  var end: number = header.length
  var list: any[] = []
  var start: number = header.length

  // gather addresses, backwards
  for (var i = header.length - 1; i >= 0; i--) {
    switch (header.charCodeAt(i)) {
      case 0x20: /*   */
        if (start === end) {
          start = end = i
        }
        break
      case 0x2c: /* , */
        if (start !== end) {
          list.push(header.substring(start, end))
        }
        start = end = i
        break
      default:
        start = i
        break
    }
  }

  // final address
  if (start !== end) {
    list.push(header.substring(start, end))
  }

  return list
}
