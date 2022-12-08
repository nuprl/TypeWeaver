var BN: any = require('bn.js')
var randomBytes: any = require('randombytes')

function blind (priv: any): any {
  var r: any = getr(priv)
  var blinder: any = r.toRed(BN.mont(priv.modulus)).redPow(new BN(priv.publicExponent)).fromRed()
  return { blinder: blinder, unblinder: r.invm(priv.modulus) }
}

function getr (priv: any): any {
  var len: number = priv.modulus.byteLength()
  var r: any
  do {
    r = new BN(randomBytes(len))
  } while (r.cmp(priv.modulus) >= 0 || !r.umod(priv.prime1) || !r.umod(priv.prime2))
  return r
}

function crt (msg: string, priv: any): any {
  var blinds: any = blind(priv)
  var len: number = priv.modulus.byteLength()
  var blinded: any = new BN(msg).mul(blinds.blinder).umod(priv.modulus)
  var c1: any = blinded.toRed(BN.mont(priv.prime1))
  var c2: any = blinded.toRed(BN.mont(priv.prime2))
  var qinv: any = priv.coefficient
  var p: any = priv.prime1
  var q: any = priv.prime2
  var m1: any = c1.redPow(priv.exponent1).fromRed()
  var m2: any = c2.redPow(priv.exponent2).fromRed()
  var h: any = m1.isub(m2).imul(qinv).umod(p).imul(q)
  return m2.iadd(h).imul(blinds.unblinder).umod(priv.modulus).toArrayLike(Buffer, 'be', len)
}
crt.getr = getr

module.exports = crt
