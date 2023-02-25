import BN from 'bn.js';
import randomBytes from 'randombytes';

function blind (priv: BlindPrivate) {
  var r = getr(priv)
  var blinder = r.toRed(BN.mont(priv.modulus)).redPow(new BN(priv.publicExponent)).fromRed()
  return { blinder: blinder, unblinder: r.invm(priv.modulus) }
}

function getr (priv: BigInt) {
  var len = priv.modulus.byteLength()
  var r
  do {
    r = new BN(randomBytes(len))
  } while (r.cmp(priv.modulus) >= 0 || !r.umod(priv.prime1) || !r.umod(priv.prime2))
  return r
}

function crt (msg: string, priv: string) {
  var blinds = blind(priv)
  var len = priv.modulus.byteLength()
  var blinded = new BN(msg).mul(blinds.blinder).umod(priv.modulus)
  var c1 = blinded.toRed(BN.mont(priv.prime1))
  var c2 = blinded.toRed(BN.mont(priv.prime2))
  var qinv = priv.coefficient
  var p = priv.prime1
  var q = priv.prime2
  var m1 = c1.redPow(priv.exponent1).fromRed()
  var m2 = c2.redPow(priv.exponent2).fromRed()
  var h = m1.isub(m2).imul(qinv).umod(p).imul(q)
  return m2.iadd(h).imul(blinds.unblinder).umod(priv.modulus).toArrayLike(Buffer, 'be', len)
}
crt.getr = getr

export default crt;