"use strict";

// Basic Javascript Elliptic Curve implementation
// Ported loosely from BouncyCastle's Java EC code
// Only Fp curves implemented for now

// Requires jsbn.js and jsbn2.js
const { randomBytes } = require("crypto");
const { BigInteger } = require("jsbn");
const { Barrett } = BigInteger.prototype;

class SecureRandom {
  nextBytes(bytes) {
    const { length } = bytes;
    const rand: any = randomBytes(length);
    for (let i = 0; i < length; ++i) {
      bytes.push(rand[i]);
    }
  }
}

// ----------------
// ECFieldElementFp

// constructor
function ECFieldElementFp(q: any, x: any): void {
  this.x = x;
  // TODO if(x.compareTo(this.q) >= 0) error
  this.q = q;
}

function feFpEquals(other: any): boolean {
  if (other == this) return true;
  return this.q.equals(other.q) && this.x.equals(other.x);
}

function feFpToBigInteger(): any {
  return this.x;
}

function feFpNegate(): any {
  return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}

function feFpAdd(b: any): any {
  return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
}

function feFpSubtract(b: any): any {
  return new ECFieldElementFp(
    this.q,
    this.x.subtract(b.toBigInteger()).mod(this.q)
  );
}

function feFpMultiply(b: any): any {
  return new ECFieldElementFp(
    this.q,
    this.x.multiply(b.toBigInteger()).mod(this.q)
  );
}

function feFpSquare(): any {
  return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}

function feFpDivide(b: any): any {
  return new ECFieldElementFp(
    this.q,
    this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q)
  );
}

ECFieldElementFp.prototype.equals = feFpEquals;
ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;
ECFieldElementFp.prototype.negate = feFpNegate;
ECFieldElementFp.prototype.add = feFpAdd;
ECFieldElementFp.prototype.subtract = feFpSubtract;
ECFieldElementFp.prototype.multiply = feFpMultiply;
ECFieldElementFp.prototype.square = feFpSquare;
ECFieldElementFp.prototype.divide = feFpDivide;
ECFieldElementFp.prototype.modDouble = function(x: any) {
  let _2x: any = x.shiftLeft(1);
  if (_2x.compareTo(this.q) >= 0) {
    _2x = _2x.subtract(this.q);
  }
  return _2x;
};

// ----------------
// ECPointFp

// constructor
function ECPointFp(curve: any, x: any, y: any, z: any): void {
  this.curve = curve;
  this.x = x;
  this.y = y;
  // Projective coordinates: either zinv == null or z * zinv == 1
  // z and zinv are just BigIntegers, not fieldElements
  if (z == null) {
    this.z = BigInteger.ONE;
  } else {
    this.z = z;
  }
  this.zinv = null;
  //TODO: compression flag
}

function pointFpGetX(): any {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  var r: any = this.x.toBigInteger().multiply(this.zinv);
  this.curve.reduce(r);
  return this.curve.fromBigInteger(r);
}

function pointFpGetY(): any {
  if (this.zinv == null) {
    this.zinv = this.z.modInverse(this.curve.q);
  }
  var r: any = this.y.toBigInteger().multiply(this.zinv);
  this.curve.reduce(r);
  return this.curve.fromBigInteger(r);
}

function pointFpEquals(other: any): boolean {
  if (other == this) return true;
  if (this.isInfinity()) return other.isInfinity();
  if (other.isInfinity()) return this.isInfinity();
  var u: any, v;
  // u = Y2 * Z1 - Y1 * Z2
  u = other.y
    .toBigInteger()
    .multiply(this.z)
    .subtract(this.y.toBigInteger().multiply(other.z))
    .mod(this.curve.q);
  if (!u.equals(BigInteger.ZERO)) return false;
  // v = X2 * Z1 - X1 * Z2
  v = other.x
    .toBigInteger()
    .multiply(this.z)
    .subtract(this.x.toBigInteger().multiply(other.z))
    .mod(this.curve.q);
  return v.equals(BigInteger.ZERO);
}

function pointFpIsInfinity(): any {
  if (this.x == null && this.y == null) return true;
  return (
    this.z.equals(BigInteger.ZERO) &&
    !this.y.toBigInteger().equals(BigInteger.ZERO)
  );
}

function pointFpNegate(): any {
  return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}

function pointFpAdd(b: any): any {
  if (this.isInfinity()) return b;
  if (b.isInfinity()) return this;

  // u = Y2 * Z1 - Y1 * Z2
  var u: any = b.y
    .toBigInteger()
    .multiply(this.z)
    .subtract(this.y.toBigInteger().multiply(b.z))
    .mod(this.curve.q);
  // v = X2 * Z1 - X1 * Z2
  var v: any = b.x
    .toBigInteger()
    .multiply(this.z)
    .subtract(this.x.toBigInteger().multiply(b.z))
    .mod(this.curve.q);

  if (BigInteger.ZERO.equals(v)) {
    if (BigInteger.ZERO.equals(u)) {
      return this.twice(); // this == b, so double
    }
    return this.curve.getInfinity(); // this = -b, so infinity
  }

  var THREE: any = new BigInteger("3");
  var x1: any = this.x.toBigInteger();
  var y1: any = this.y.toBigInteger();
  var x2: any = b.x.toBigInteger();
  var y2: any = b.y.toBigInteger();

  var v2: any = v.square();
  var v3: any = v2.multiply(v);
  var x1v2: any = x1.multiply(v2);
  var zu2: any = u.square().multiply(this.z);

  // x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
  var x3: any = zu2
    .subtract(x1v2.shiftLeft(1))
    .multiply(b.z)
    .subtract(v3)
    .multiply(v)
    .mod(this.curve.q);
  // y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
  var y3: any = x1v2
    .multiply(THREE)
    .multiply(u)
    .subtract(y1.multiply(v3))
    .subtract(zu2.multiply(u))
    .multiply(b.z)
    .add(u.multiply(v3))
    .mod(this.curve.q);
  // z3 = v^3 * z1 * z2
  var z3: any = v3
    .multiply(this.z)
    .multiply(b.z)
    .mod(this.curve.q);

  return new ECPointFp(
    this.curve,
    this.curve.fromBigInteger(x3),
    this.curve.fromBigInteger(y3),
    z3
  );
}

function pointFpTwice(): any {
  if (this.isInfinity()) return this;
  if (this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();

  // TODO: optimized handling of constants
  var THREE: any = new BigInteger("3");
  var x1: any = this.x.toBigInteger();
  var y1: any = this.y.toBigInteger();

  var y1z1: any = y1.multiply(this.z);
  var y1sqz1: any = y1z1.multiply(y1).mod(this.curve.q);
  var a: any = this.curve.a.toBigInteger();

  // w = 3 * x1^2 + a * z1^2
  var w: any = x1.square().multiply(THREE);
  if (!BigInteger.ZERO.equals(a)) {
    w = w.add(this.z.square().multiply(a));
  }
  w = w.mod(this.curve.q);
  //this.curve.reduce(w);
  // x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
  var x3: any = w
    .square()
    .subtract(x1.shiftLeft(3).multiply(y1sqz1))
    .shiftLeft(1)
    .multiply(y1z1)
    .mod(this.curve.q);
  // y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
  var y3: any = w
    .multiply(THREE)
    .multiply(x1)
    .subtract(y1sqz1.shiftLeft(1))
    .shiftLeft(2)
    .multiply(y1sqz1)
    .subtract(w.square().multiply(w))
    .mod(this.curve.q);
  // z3 = 8 * (y1 * z1)^3
  var z3: any = y1z1
    .square()
    .multiply(y1z1)
    .shiftLeft(3)
    .mod(this.curve.q);

  return new ECPointFp(
    this.curve,
    this.curve.fromBigInteger(x3),
    this.curve.fromBigInteger(y3),
    z3
  );
}

// Simple NAF (Non-Adjacent Form) multiplication algorithm
// TODO: modularize the multiplication algorithm
function pointFpMultiply(k: any): any {
  if (this.isInfinity()) return this;
  if (k.signum() == 0) return this.curve.getInfinity();

  var e: any = k;
  var h: any = e.multiply(new BigInteger("3"));

  var neg: any = this.negate();
  var R: this = this;

  var i: number;
  for (i = h.bitLength() - 2; i > 0; --i) {
    R = R.twice();

    var hBit: any = h.testBit(i);
    var eBit: any = e.testBit(i);

    if (hBit != eBit) {
      R = R.add(hBit ? this : neg);
    }
  }

  return R;
}

// Compute this*j + x*k (simultaneous multiplication)
function pointFpMultiplyTwo(j: number, x: any, k: any): any {
  var i: number;
  if (j.bitLength() > k.bitLength()) i = j.bitLength() - 1;
  else i = k.bitLength() - 1;

  var R: any = this.curve.getInfinity();
  var both: any = this.add(x);
  while (i >= 0) {
    R = R.twice();
    if (j.testBit(i)) {
      if (k.testBit(i)) {
        R = R.add(both);
      } else {
        R = R.add(this);
      }
    } else {
      if (k.testBit(i)) {
        R = R.add(x);
      }
    }
    --i;
  }

  return R;
}

ECPointFp.prototype.getX = pointFpGetX;
ECPointFp.prototype.getY = pointFpGetY;
ECPointFp.prototype.equals = pointFpEquals;
ECPointFp.prototype.isInfinity = pointFpIsInfinity;
ECPointFp.prototype.negate = pointFpNegate;
ECPointFp.prototype.add = pointFpAdd;
ECPointFp.prototype.twice = pointFpTwice;
ECPointFp.prototype.multiply = pointFpMultiply;
ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;

// ----------------
// ECCurveFp

// constructor
function ECCurveFp(q: any, a: any, b: any): void {
  this.q = q;
  this.a = this.fromBigInteger(a);
  this.b = this.fromBigInteger(b);
  this.infinity = new ECPointFp(this, null, null);
  this.reducer = new Barrett(this.q);
}

function curveFpGetQ(): any {
  return this.q;
}

function curveFpGetA(): any {
  return this.a;
}

function curveFpGetB(): boolean {
  return this.b;
}

function curveFpEquals(other: any): boolean {
  if (other == this) return true;
  return (
    this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b)
  );
}

function curveFpGetInfinity(): any {
  return this.infinity;
}

function curveFpFromBigInteger(x: any): any {
  return new ECFieldElementFp(this.q, x);
}

function curveReduce(x: any): void {
  this.reducer.reduce(x);
}

function curveFpEncodePointHex(p: any): any {
  if (p.isInfinity()) return "00";
  var xHex: any = p
    .getX()
    .toBigInteger()
    .toString(16);
  var yHex: any = p
    .getY()
    .toBigInteger()
    .toString(16);
  var oLen: any = this.getQ().toString(16).length;
  if (oLen % 2 != 0) oLen++;
  while (xHex.length < oLen) {
    xHex = "0" + xHex;
  }
  while (yHex.length < oLen) {
    yHex = "0" + yHex;
  }
  return "04" + xHex + yHex;
}

ECCurveFp.prototype.getQ = curveFpGetQ;
ECCurveFp.prototype.getA = curveFpGetA;
ECCurveFp.prototype.getB = curveFpGetB;
ECCurveFp.prototype.equals = curveFpEquals;
ECCurveFp.prototype.getInfinity = curveFpGetInfinity;
ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;
ECCurveFp.prototype.reduce = curveReduce;
ECCurveFp.prototype.encodePointHex = curveFpEncodePointHex;

// from: https://github.com/kaielvin/jsbn-ec-point-compression
ECCurveFp.prototype.decodePointHex = function(s: string) {
  var yIsEven: any;
  switch (
    parseInt(s.substr(0, 2), 16) // first byte
  ) {
    case 0:
      return this.infinity;
    case 2:
      yIsEven = false;
    case 3:
      if (yIsEven == undefined) yIsEven = true;
      var len: number = s.length - 2;
      var xHex: any = s.substr(2, len);
      var x: any = this.fromBigInteger(new BigInteger(xHex, 16));
      var alpha: any = x.multiply(x.square().add(this.getA())).add(this.getB());
      var beta: any = alpha.sqrt();

      if (beta == null) throw "Invalid point compression";

      var betaValue: any = beta.toBigInteger();
      if (betaValue.testBit(0) != yIsEven) {
        // Use the other root
        beta = this.fromBigInteger(this.getQ().subtract(betaValue));
      }
      return new ECPointFp(this, x, beta);
    case 4:
    case 6:
    case 7:
      var len: number = (s.length - 2) / 2;
      var xHex: any = s.substr(2, len);
      var yHex: any = s.substr(len + 2, len);

      return new ECPointFp(
        this,
        this.fromBigInteger(new BigInteger(xHex, 16)),
        this.fromBigInteger(new BigInteger(yHex, 16))
      );

    default:
      // unsupported
      return null;
  }
};
ECCurveFp.prototype.encodeCompressedPointHex = function(p: any) {
  if (p.isInfinity()) return "00";
  var xHex: any = p
    .getX()
    .toBigInteger()
    .toString(16);
  var oLen: any = this.getQ().toString(16).length;
  if (oLen % 2 != 0) oLen++;
  while (xHex.length < oLen) xHex = "0" + xHex;
  var yPrefix: any;
  if (
    p
      .getY()
      .toBigInteger()
      .isEven()
  )
    yPrefix = "02";
  else yPrefix = "03";

  return yPrefix + xHex;
};

ECFieldElementFp.prototype.getR = function() {
  if (this.r != undefined) return this.r;

  this.r = null;
  var bitLength: any = this.q.bitLength();
  if (bitLength > 128) {
    var firstWord: any = this.q.shiftRight(bitLength - 64);
    if (firstWord.intValue() == -1) {
      this.r = BigInteger.ONE.shiftLeft(bitLength).subtract(this.q);
    }
  }
  return this.r;
};
ECFieldElementFp.prototype.modMult = function(x1: any, x2: any) {
  return this.modReduce(x1.multiply(x2));
};
ECFieldElementFp.prototype.modReduce = function(x: any) {
  if (this.getR() != null) {
    var qLen: any = this.q.bitLength();
    while (x.bitLength() > qLen + 1) {
      var u: any = x.shiftRight(qLen);
      var v: any = x.subtract(u.shiftLeft(qLen));
      if (!this.getR().equals(BigInteger.ONE)) {
        u = u.multiply(this.getR());
      }
      x = u.add(v);
    }
    while (x.compareTo(this.q) >= 0) {
      x = x.subtract(this.q);
    }
  } else {
    x = x.mod(this.q);
  }
  return x;
};
ECFieldElementFp.prototype.sqrt = function() {
  if (!this.q.testBit(0)) throw "unsupported";

  // p mod 4 == 3
  if (this.q.testBit(1)) {
    var z: any = new ECFieldElementFp(
      this.q,
      this.x.modPow(this.q.shiftRight(2).add(BigInteger.ONE), this.q)
    );
    return z.square().equals(this) ? z : null;
  }

  // p mod 4 == 1
  var qMinusOne: any = this.q.subtract(BigInteger.ONE);

  var legendreExponent: any = qMinusOne.shiftRight(1);
  if (!this.x.modPow(legendreExponent, this.q).equals(BigInteger.ONE)) {
    return null;
  }

  var u: any = qMinusOne.shiftRight(2);
  var k: any = u.shiftLeft(1).add(BigInteger.ONE);

  var Q: any = this.x;
  var fourQ: any = this.modDouble(this.modDouble(Q));

  var U: any, V;
  do {
    var P: any;
    do {
      P = new BigInteger(this.q.bitLength(), new SecureRandom());
    } while (
      P.compareTo(this.q) >= 0 ||
      !P.multiply(P)
        .subtract(fourQ)
        .modPow(legendreExponent, this.q)
        .equals(qMinusOne)
    );

    var result: any = this.lucasSequence(P, Q, k);
    U = result[0];
    V = result[1];

    if (this.modMult(V, V).equals(fourQ)) {
      // Integer division by 2, mod q
      if (V.testBit(0)) {
        V = V.add(this.q);
      }

      V = V.shiftRight(1);

      return new ECFieldElementFp(this.q, V);
    }
  } while (U.equals(BigInteger.ONE) || U.equals(qMinusOne));

  return null;
};
ECFieldElementFp.prototype.lucasSequence = function(P: any, Q: any, k: any) {
  var n: any = k.bitLength();
  var s: any = k.getLowestSetBit();

  var Uh: any = BigInteger.ONE;
  var Vl: any = BigInteger.ONE.add(BigInteger.ONE);
  var Vh: any = P;
  var Ql: any = BigInteger.ONE;
  var Qh: any = BigInteger.ONE;

  for (var j = n - 1; j >= s + 1; --j) {
    Ql = this.modMult(Ql, Qh);

    if (k.testBit(j)) {
      Qh = this.modMult(Ql, Q);
      Uh = this.modMult(Uh, Vh);
      Vl = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql)));
      Vh = this.modReduce(Vh.multiply(Vh).subtract(Qh.shiftLeft(1)));
    } else {
      Qh = Ql;
      Uh = this.modReduce(Uh.multiply(Vl).subtract(Ql));
      Vh = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql)));
      Vl = this.modReduce(Vl.multiply(Vl).subtract(Ql.shiftLeft(1)));
    }
  }

  Ql = this.modMult(Ql, Qh);
  Qh = this.modMult(Ql, Q);
  Uh = this.modReduce(Uh.multiply(Vl).subtract(Ql));
  Vl = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql)));
  Ql = this.modMult(Ql, Qh);

  for (var j = 1; j <= s; ++j) {
    Uh = this.modMult(Uh, Vl);
    Vl = this.modReduce(Vl.multiply(Vl).subtract(Ql.shiftLeft(1)));
    Ql = this.modMult(Ql, Ql);
  }

  return [Uh, Vl];
};

module.exports = {
  ECCurveFp,
  ECPointFp,
  ECFieldElementFp,
};