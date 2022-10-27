var BN: Array = require('bn.js')
var randomBytes: Function = require('randombytes')

function blind (priv: HTMLElement): Object {
  var r: HTMLElement = getr(priv)
  var blinder: Array = r.toRed(BN.mont(priv.modulus)).redPow(new BN(priv.publicExponent)).fromRed()
  return { blinder: blinder, unblinder: r.invm(priv.modulus) }
}

function getr (priv: HTMLElement): HTMLElement {
  var len: String = priv.modulus.byteLength()
  var r: HTMLElement
  do {
    r = new BN(randomBytes(len))
  } while (r.cmp(priv.modulus) >= 0 || !r.umod(priv.prime1) || !r.umod(priv.prime2))
  return r
}

function crt (msg: String, priv: HTMLElement): Promise {
  var blinds: Object = blind(priv)
  var len: Number = priv.modulus.byteLength()
  var blinded: HTMLElement = new BN(msg).mul(blinds.blinder).umod(priv.modulus)
  var c1: HTMLElement = blinded.toRed(BN.mont(priv.prime1))
  var c2: HTMLElement = blinded.toRed(BN.mont(priv.prime2))
  var qinv: Function = priv.coefficient
  var p: Function = priv.prime1
  var q: Function = priv.prime2
  var m1: HTMLElement = c1.redPow(priv.exponent1).fromRed()
  var m2: Object = c2.redPow(priv.exponent2).fromRed()
  var h: String = m1.isub(m2).imul(qinv).umod(p).imul(q)
  return m2.iadd(h).imul(blinds.unblinder).umod(priv.modulus).toArrayLike(Buffer, 'be', len)
}
crt.getr = getr

module.exports = crt
