var elliptic: any = require('elliptic')
var BN: any = require('bn.js')

module.exports = function createECDH (curve: any): any {
  return new ECDH(curve)
}

var aliases: any = {
  secp256k1: {
    name: 'secp256k1',
    byteLength: 32
  },
  secp224r1: {
    name: 'p224',
    byteLength: 28
  },
  prime256v1: {
    name: 'p256',
    byteLength: 32
  },
  prime192v1: {
    name: 'p192',
    byteLength: 24
  },
  ed25519: {
    name: 'ed25519',
    byteLength: 32
  },
  secp384r1: {
    name: 'p384',
    byteLength: 48
  },
  secp521r1: {
    name: 'p521',
    byteLength: 66
  }
}

aliases.p224 = aliases.secp224r1
aliases.p256 = aliases.secp256r1 = aliases.prime256v1
aliases.p192 = aliases.secp192r1 = aliases.prime192v1
aliases.p384 = aliases.secp384r1
aliases.p521 = aliases.secp521r1

function ECDH (curve: any): void {
  this.curveType = aliases[curve]
  if (!this.curveType) {
    this.curveType = {
      name: curve
    }
  }
  this.curve = new elliptic.ec(this.curveType.name) // eslint-disable-line new-cap
  this.keys = void 0
}

ECDH.prototype.generateKeys = function (enc: any, format: string) {
  this.keys = this.curve.genKeyPair()
  return this.getPublicKey(enc, format)
}

ECDH.prototype.computeSecret = function (other: any, inenc: any, enc: any) {
  inenc = inenc || 'utf8'
  if (!Buffer.isBuffer(other)) {
    other = new Buffer(other, inenc)
  }
  var otherPub: any = this.curve.keyFromPublic(other).getPublic()
  var out: any = otherPub.mul(this.keys.getPrivate()).getX()
  return formatReturnValue(out, enc, this.curveType.byteLength)
}

ECDH.prototype.getPublicKey = function (enc: any, format: string) {
  var key: string = this.keys.getPublic(format === 'compressed', true)
  if (format === 'hybrid') {
    if (key[key.length - 1] % 2) {
      key[0] = 7
    } else {
      key[0] = 6
    }
  }
  return formatReturnValue(key, enc)
}

ECDH.prototype.getPrivateKey = function (enc: any) {
  return formatReturnValue(this.keys.getPrivate(), enc)
}

ECDH.prototype.setPublicKey = function (pub: any, enc: any) {
  enc = enc || 'utf8'
  if (!Buffer.isBuffer(pub)) {
    pub = new Buffer(pub, enc)
  }
  this.keys._importPublic(pub)
  return this
}

ECDH.prototype.setPrivateKey = function (priv: any, enc: any) {
  enc = enc || 'utf8'
  if (!Buffer.isBuffer(priv)) {
    priv = new Buffer(priv, enc)
  }

  var _priv: any = new BN(priv)
  _priv = _priv.toString(16)
  this.keys = this.curve.genKeyPair()
  this.keys._importPrivate(_priv)
  return this
}

function formatReturnValue (bn: any, enc: any, len: number): any {
  if (!Array.isArray(bn)) {
    bn = bn.toArray()
  }
  var buf: any = new Buffer(bn)
  if (len && buf.length < len) {
    var zeros: any = new Buffer(len - buf.length)
    zeros.fill(0)
    buf = Buffer.concat([zeros, buf])
  }
  if (!enc) {
    return buf
  } else {
    return buf.toString(enc)
  }
}
