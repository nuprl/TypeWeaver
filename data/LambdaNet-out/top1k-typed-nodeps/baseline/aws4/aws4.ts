var aws4: HTMLElement = exports,
    url: String = require('url'),
    querystring: String = require('querystring'),
    crypto: String = require('crypto'),
    lru: Function = require('./lru'),
    credentialsCache: Map = lru(1000)

// http://docs.amazonwebservices.com/general/latest/gr/signature-version-4.html

function hmac(key: String, string: String, encoding: Number): String {
  return crypto.createHmac('sha256', key).update(string, 'utf8').digest(encoding)
}

function hash(string: String, encoding: String): String {
  return crypto.createHash('sha256').update(string, 'utf8').digest(encoding)
}

// This function assumes the string has already been percent encoded
function encodeRfc3986(urlEncodedString: String): String {
  return urlEncodedString.replace(/[!'()*]/g, function(c: String) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

function encodeRfc3986Full(str: String): String {
  return encodeRfc3986(encodeURIComponent(str))
}

// A bit of a combination of:
// https://github.com/aws/aws-sdk-java-v2/blob/dc695de6ab49ad03934e1b02e7263abbd2354be0/core/auth/src/main/java/software/amazon/awssdk/auth/signer/internal/AbstractAws4Signer.java#L59
// https://github.com/aws/aws-sdk-js/blob/18cb7e5b463b46239f9fdd4a65e2ff8c81831e8f/lib/signers/v4.js#L191-L199
// https://github.com/mhart/aws4fetch/blob/b3aed16b6f17384cf36ea33bcba3c1e9f3bdfefd/src/main.js#L25-L34
var HEADERS_TO_IGNORE: Object = {
  'authorization': true,
  'connection': true,
  'x-amzn-trace-id': true,
  'user-agent': true,
  'expect': true,
  'presigned-expires': true,
  'range': true,
}

// request: { path | body, [host], [method], [headers], [service], [region] }
// credentials: { accessKeyId, secretAccessKey, [sessionToken] }
function RequestSigner(request: Object, credentials: String): Void {

  if (typeof request === 'string') request = url.parse(request)

  var headers: HTMLElement = request.headers = (request.headers || {}),
      hostParts: Object = (!this.service || !this.region) && this.matchHost(request.hostname || request.host || headers.Host || headers.host)

  this.request = request
  this.credentials = credentials || this.defaultCredentials()

  this.service = request.service || hostParts[0] || ''
  this.region = request.region || hostParts[1] || 'us-east-1'

  // SES uses a different domain from the service name
  if (this.service === 'email') this.service = 'ses'

  if (!request.method && request.body)
    request.method = 'POST'

  if (!headers.Host && !headers.host) {
    headers.Host = request.hostname || request.host || this.createHost()

    // If a port is specified explicitly, use it as is
    if (request.port)
      headers.Host += ':' + request.port
  }
  if (!request.hostname && !request.host)
    request.hostname = headers.Host || headers.host

  this.isCodeCommitGit = this.service === 'codecommit' && request.method === 'GIT'
}

RequestSigner.prototype.matchHost = function(host: Number) {
  var match: Array = (host || '').match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com(\.cn)?$/)
  var hostParts: Object = (match || []).slice(1, 3)

  // ES's hostParts are sometimes the other way round, if the value that is expected
  // to be region equals ‘es’ switch them back
  // e.g. search-cluster-name-aaaa00aaaa0aaa0aaaaaaa0aaa.us-east-1.es.amazonaws.com
  if (hostParts[1] === 'es')
    hostParts = hostParts.reverse()

  if (hostParts[1] == 's3') {
    hostParts[0] = 's3'
    hostParts[1] = 'us-east-1'
  } else {
    for (var i = 0; i < 2; i++) {
      if (/^s3-/.test(hostParts[i])) {
        hostParts[1] = hostParts[i].slice(3)
        hostParts[0] = 's3'
        break
      }
    }
  }

  return hostParts
}

// http://docs.aws.amazon.com/general/latest/gr/rande.html
RequestSigner.prototype.isSingleRegion = function() {
  // Special case for S3 and SimpleDB in us-east-1
  if (['s3', 'sdb'].indexOf(this.service) >= 0 && this.region === 'us-east-1') return true

  return ['cloudfront', 'ls', 'route53', 'iam', 'importexport', 'sts']
    .indexOf(this.service) >= 0
}

RequestSigner.prototype.createHost = function() {
  var region: String = this.isSingleRegion() ? '' : '.' + this.region,
      subdomain: String = this.service === 'ses' ? 'email' : this.service
  return subdomain + region + '.amazonaws.com'
}

RequestSigner.prototype.prepareRequest = function() {
  this.parsePath()

  var request: Object = this.request, headers: Object = request.headers, query: Object

  if (request.signQuery) {

    this.parsedPath.query = query = this.parsedPath.query || {}

    if (this.credentials.sessionToken)
      query['X-Amz-Security-Token'] = this.credentials.sessionToken

    if (this.service === 's3' && !query['X-Amz-Expires'])
      query['X-Amz-Expires'] = 86400

    if (query['X-Amz-Date'])
      this.datetime = query['X-Amz-Date']
    else
      query['X-Amz-Date'] = this.getDateTime()

    query['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256'
    query['X-Amz-Credential'] = this.credentials.accessKeyId + '/' + this.credentialString()
    query['X-Amz-SignedHeaders'] = this.signedHeaders()

  } else {

    if (!request.doNotModifyHeaders && !this.isCodeCommitGit) {
      if (request.body && !headers['Content-Type'] && !headers['content-type'])
        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

      if (request.body && !headers['Content-Length'] && !headers['content-length'])
        headers['Content-Length'] = Buffer.byteLength(request.body)

      if (this.credentials.sessionToken && !headers['X-Amz-Security-Token'] && !headers['x-amz-security-token'])
        headers['X-Amz-Security-Token'] = this.credentials.sessionToken

      if (this.service === 's3' && !headers['X-Amz-Content-Sha256'] && !headers['x-amz-content-sha256'])
        headers['X-Amz-Content-Sha256'] = hash(this.request.body || '', 'hex')

      if (headers['X-Amz-Date'] || headers['x-amz-date'])
        this.datetime = headers['X-Amz-Date'] || headers['x-amz-date']
      else
        headers['X-Amz-Date'] = this.getDateTime()
    }

    delete headers.Authorization
    delete headers.authorization
  }
}

RequestSigner.prototype.sign = function() {
  if (!this.parsedPath) this.prepareRequest()

  if (this.request.signQuery) {
    this.parsedPath.query['X-Amz-Signature'] = this.signature()
  } else {
    this.request.headers.Authorization = this.authHeader()
  }

  this.request.path = this.formatPath()

  return this.request
}

RequestSigner.prototype.getDateTime = function() {
  if (!this.datetime) {
    var headers: Object = this.request.headers,
      date: HTMLInputElement = new Date(headers.Date || headers.date || new Date)

    this.datetime = date.toISOString().replace(/[:\-]|\.\d{3}/g, '')

    // Remove the trailing 'Z' on the timestamp string for CodeCommit git access
    if (this.isCodeCommitGit) this.datetime = this.datetime.slice(0, -1)
  }
  return this.datetime
}

RequestSigner.prototype.getDate = function() {
  return this.getDateTime().substr(0, 8)
}

RequestSigner.prototype.authHeader = function() {
  return [
    'AWS4-HMAC-SHA256 Credential=' + this.credentials.accessKeyId + '/' + this.credentialString(),
    'SignedHeaders=' + this.signedHeaders(),
    'Signature=' + this.signature(),
  ].join(', ')
}

RequestSigner.prototype.signature = function() {
  var date: Array = this.getDate(),
      cacheKey: String = [this.credentials.secretAccessKey, date, this.region, this.service].join(),
      kDate: String, kRegion: String, kService: String, kCredentials: String = credentialsCache.get(cacheKey)
  if (!kCredentials) {
    kDate = hmac('AWS4' + this.credentials.secretAccessKey, date)
    kRegion = hmac(kDate, this.region)
    kService = hmac(kRegion, this.service)
    kCredentials = hmac(kService, 'aws4_request')
    credentialsCache.set(cacheKey, kCredentials)
  }
  return hmac(kCredentials, this.stringToSign(), 'hex')
}

RequestSigner.prototype.stringToSign = function() {
  return [
    'AWS4-HMAC-SHA256',
    this.getDateTime(),
    this.credentialString(),
    hash(this.canonicalString(), 'hex'),
  ].join('\n')
}

RequestSigner.prototype.canonicalString = function() {
  if (!this.parsedPath) this.prepareRequest()

  var pathStr: String = this.parsedPath.path,
      query: Object = this.parsedPath.query,
      headers: Object = this.request.headers,
      queryStr: String = '',
      normalizePath: Number = this.service !== 's3',
      decodePath: Number = this.service === 's3' || this.request.doNotEncodePath,
      decodeSlashesInPath: Number = this.service === 's3',
      firstValOnly: Boolean = this.service === 's3',
      bodyHash: String

  if (this.service === 's3' && this.request.signQuery) {
    bodyHash = 'UNSIGNED-PAYLOAD'
  } else if (this.isCodeCommitGit) {
    bodyHash = ''
  } else {
    bodyHash = headers['X-Amz-Content-Sha256'] || headers['x-amz-content-sha256'] ||
      hash(this.request.body || '', 'hex')
  }

  if (query) {
    var reducedQuery: Function = Object.keys(query).reduce(function(obj: Object, key: String) {
      if (!key) return obj
      obj[encodeRfc3986Full(key)] = !Array.isArray(query[key]) ? query[key] :
        (firstValOnly ? query[key][0] : query[key])
      return obj
    }, {})
    var encodedQueryPieces: Array = []
    Object.keys(reducedQuery).sort().forEach(function(key: String) {
      if (!Array.isArray(reducedQuery[key])) {
        encodedQueryPieces.push(key + '=' + encodeRfc3986Full(reducedQuery[key]))
      } else {
        reducedQuery[key].map(encodeRfc3986Full).sort()
          .forEach(function(val: String) { encodedQueryPieces.push(key + '=' + val) })
      }
    })
    queryStr = encodedQueryPieces.join('&')
  }
  if (pathStr !== '/') {
    if (normalizePath) pathStr = pathStr.replace(/\/{2,}/g, '/')
    pathStr = pathStr.split('/').reduce(function(path: String, piece: String) {
      if (normalizePath && piece === '..') {
        path.pop()
      } else if (!normalizePath || piece !== '.') {
        if (decodePath) piece = decodeURIComponent(piece.replace(/\+/g, ' '))
        path.push(encodeRfc3986Full(piece))
      }
      return path
    }, []).join('/')
    if (pathStr[0] !== '/') pathStr = '/' + pathStr
    if (decodeSlashesInPath) pathStr = pathStr.replace(/%2F/g, '/')
  }

  return [
    this.request.method || 'GET',
    pathStr,
    queryStr,
    this.canonicalHeaders() + '\n',
    this.signedHeaders(),
    bodyHash,
  ].join('\n')
}

RequestSigner.prototype.canonicalHeaders = function() {
  var headers: Object = this.request.headers
  function trimAll(header: String): String {
    return header.toString().trim().replace(/\s+/g, ' ')
  }
  return Object.keys(headers)
    .filter(function(key: String) { return HEADERS_TO_IGNORE[key.toLowerCase()] == null })
    .sort(function(a: String, b: String) { return a.toLowerCase() < b.toLowerCase() ? -1 : 1 })
    .map(function(key: String) { return key.toLowerCase() + ':' + trimAll(headers[key]) })
    .join('\n')
}

RequestSigner.prototype.signedHeaders = function() {
  return Object.keys(this.request.headers)
    .map(function(key: String) { return key.toLowerCase() })
    .filter(function(key: String) { return HEADERS_TO_IGNORE[key] == null })
    .sort()
    .join(';')
}

RequestSigner.prototype.credentialString = function() {
  return [
    this.getDate(),
    this.region,
    this.service,
    'aws4_request',
  ].join('/')
}

RequestSigner.prototype.defaultCredentials = function() {
  var env: HTMLElement = process.env
  return {
    accessKeyId: env.AWS_ACCESS_KEY_ID || env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || env.AWS_SECRET_KEY,
    sessionToken: env.AWS_SESSION_TOKEN,
  }
}

RequestSigner.prototype.parsePath = function() {
  var path: String = this.request.path || '/'

  // S3 doesn't always encode characters > 127 correctly and
  // all services don't encode characters > 255 correctly
  // So if there are non-reserved chars (and it's not already all % encoded), just encode them all
  if (/[^0-9A-Za-z;,/?:@&=+$\-_.!~*'()#%]/.test(path)) {
    path = encodeURI(decodeURI(path))
  }

  var queryIx: Number = path.indexOf('?'),
      query: Array = null

  if (queryIx >= 0) {
    query = querystring.parse(path.slice(queryIx + 1))
    path = path.slice(0, queryIx)
  }

  this.parsedPath = {
    path: path,
    query: query,
  }
}

RequestSigner.prototype.formatPath = function() {
  var path: String = this.parsedPath.path,
      query: Object = this.parsedPath.query

  if (!query) return path

  // Services don't support empty query string keys
  if (query[''] != null) delete query['']

  return path + '?' + encodeRfc3986(querystring.stringify(query))
}

aws4.RequestSigner = RequestSigner

aws4.sign = function(request: Object, credentials: String) {
  return new RequestSigner(request, credentials).sign()
}
