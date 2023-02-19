import crypto from 'crypto';

function sha (key: string, body: any, algorithm: string): string {
  return crypto.createHmac(algorithm, key).update(body).digest('base64')
}

function rsa (key: string, body: any): string {
  return crypto.createSign('RSA-SHA1').update(body).sign(key, 'base64')
}

function rfc3986 (str: string): string {
  return encodeURIComponent(str)
    .replace(/!/g,'%21')
    .replace(/\*/g,'%2A')
    .replace(/\(/g,'%28')
    .replace(/\)/g,'%29')
    .replace(/'/g,'%27')
}

// Maps object to bi-dimensional array
// Converts { foo: 'A', bar: [ 'b', 'B' ]} to
// [ ['foo', 'A'], ['bar', 'b'], ['bar', 'B'] ]
function map (obj: any): any {
  var key: string, val, arr = []
  for (key in obj) {
    val = obj[key]
    if (Array.isArray(val))
      for (var i = 0; i < val.length; i++)
        arr.push([key, val[i]])
    else if (typeof val === 'object')
      for (var prop in val)
        arr.push([key + '[' + prop + ']', val[prop]])
    else
      arr.push([key, val])
  }
  return arr
}

// Compare function for sort
function compare (a: any, b: any): number {
  return a > b ? 1 : a < b ? -1 : 0
}

function generateBase (httpMethod: string, base_uri: any, params: any): any {
  // adapted from https://dev.twitter.com/docs/auth/oauth and 
  // https://dev.twitter.com/docs/auth/creating-signature

  // Parameter normalization
  // http://tools.ietf.org/html/rfc5849#section-3.4.1.3.2
  var normalized: any = map(params)
  // 1.  First, the name and value of each parameter are encoded
  .map(function (p: any) {
    return [ rfc3986(p[0]), rfc3986(p[1] || '') ]
  })
  // 2.  The parameters are sorted by name, using ascending byte value
  //     ordering.  If two or more parameters share the same name, they
  //     are sorted by their value.
  .sort(function (a: any, b: any) {
    return compare(a[0], b[0]) || compare(a[1], b[1])
  })
  // 3.  The name of each parameter is concatenated to its corresponding
  //     value using an "=" character (ASCII code 61) as a separator, even
  //     if the value is empty.
  .map(function (p: any) { return p.join('=') })
   // 4.  The sorted name/value pairs are concatenated together into a
   //     single string by using an "&" character (ASCII code 38) as
   //     separator.
  .join('&')

  var base: any[] = [
    rfc3986(httpMethod ? httpMethod.toUpperCase() : 'GET'),
    rfc3986(base_uri),
    rfc3986(normalized)
  ].join('&')

  return base
}

function hmacsign (httpMethod: string, base_uri: string, params: any, consumer_secret: string, token_secret: string): string {
  var base: string = generateBase(httpMethod, base_uri, params)
  var key: string = [
    consumer_secret || '',
    token_secret || ''
  ].map(rfc3986).join('&')

  return sha(key, base, 'sha1')
}

function hmacsign256 (httpMethod: string, base_uri: string, params: any, consumer_secret: string, token_secret: string): any {
  var base: string = generateBase(httpMethod, base_uri, params)
  var key: string = [
    consumer_secret || '',
    token_secret || ''
  ].map(rfc3986).join('&')

  return sha(key, base, 'sha256')
}

function rsasign (httpMethod: string, base_uri: string, params: any, private_key: string, token_secret: string): any {
  var base: string = generateBase(httpMethod, base_uri, params)
  var key: string = private_key || ''

  return rsa(key, base)
}

function plaintext (consumer_secret: string, token_secret: string): string {
  var key: string = [
    consumer_secret || '',
    token_secret || ''
  ].map(rfc3986).join('&')

  return key
}

function sign (signMethod: string, httpMethod: string, base_uri: any, params: any, consumer_secret: any, token_secret: any): any {
  var method: any
  var skipArgs: any = 1

  switch (signMethod) {
    case 'RSA-SHA1':
      method = rsasign
      break
    case 'HMAC-SHA1':
      method = hmacsign
      break
    case 'HMAC-SHA256':
      method = hmacsign256
      break
    case 'PLAINTEXT':
      method = plaintext
      skipArgs = 4
      break
    default:
     throw new Error('Signature method not supported: ' + signMethod)
  }

  return method.apply(null, [].slice.call(arguments, skipArgs))
}

exports.hmacsign = hmacsign
exports.hmacsign256 = hmacsign256
exports.rsasign = rsasign
exports.plaintext = plaintext
exports.sign = sign
exports.rfc3986 = rfc3986
exports.generateBase = generateBase