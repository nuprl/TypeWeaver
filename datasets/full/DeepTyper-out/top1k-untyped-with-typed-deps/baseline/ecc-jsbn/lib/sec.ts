// Named EC curves
"use strict";

// Requires ec.js, jsbn.js, and jsbn2.js
var { BigInteger } = require("jsbn");
var { ECCurveFp } = require("./ec.js");

// ----------------
// X9ECParameters

// constructor
function X9ECParameters(curve: any, g: any, n: number, h: any): void {
  this.curve = curve;
  this.g = g;
  this.n = n;
  this.h = h;
}

function x9getCurve(): any {
  return this.curve;
}

function x9getG(): any {
  return this.g;
}

function x9getN(): any {
  return this.n;
}

function x9getH(): any {
  return this.h;
}

X9ECParameters.prototype.getCurve = x9getCurve;
X9ECParameters.prototype.getG = x9getG;
X9ECParameters.prototype.getN = x9getN;
X9ECParameters.prototype.getH = x9getH;

// ----------------
// SECNamedCurves

const fromHex: any = string => new BigInteger(string, 16);

function secp128r1(): any {
  // p = 2^128 - 2^97 - 1
  var p: any = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF");
  var a: any = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC");
  var b: any = fromHex("E87579C11079F43DD824993C2CEE5ED3");
  //byte[] S = Hex.decode("000E0D4D696E6768756151750CC03A4473D03679");
  var n: any = fromHex("FFFFFFFE0000000075A30D1B9038A115");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "161FF7528B899B2D0C28607CA52C5B86" +
      "CF5AC8395BAFEB13C02DA292DDED7A83"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp160k1(): any {
  // p = 2^160 - 2^32 - 2^14 - 2^12 - 2^9 - 2^8 - 2^7 - 2^3 - 2^2 - 1
  var p: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");
  var a: any = BigInteger.ZERO;
  var b: any = fromHex("7");
  //byte[] S = null;
  var n: any = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB" +
      "938CF935318FDCED6BC28286531733C3F03C4FEE"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp160r1(): any {
  // p = 2^160 - 2^31 - 1
  var p: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF");
  var a: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC");
  var b: any = fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45");
  //byte[] S = Hex.decode("1053CDE42C14D696E67687561517533BF3F83345");
  var n: any = fromHex("0100000000000000000001F4C8F927AED3CA752257");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "4A96B5688EF573284664698968C38BB913CBFC82" +
      "23A628553168947D59DCC912042351377AC5FB32"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp192k1(): any {
  // p = 2^192 - 2^32 - 2^12 - 2^8 - 2^7 - 2^6 - 2^3 - 1
  var p: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37");
  var a: any = BigInteger.ZERO;
  var b: any = fromHex("3");
  //byte[] S = null;
  var n: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D" +
      "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp192r1(): any {
  // p = 2^192 - 2^64 - 1
  var p: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF");
  var a: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC");
  var b: any = fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1");
  //byte[] S = Hex.decode("3045AE6FC8422F64ED579528D38120EAE12196D5");
  var n: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012" +
      "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp224r1(): any {
  // p = 2^224 - 2^96 + 1
  var p: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001");
  var a: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE");
  var b: any = fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4");
  //byte[] S = Hex.decode("BD71344799D5C7FCDC45B59FA3B9AB8F6A948BC5");
  var n: any = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D");
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21" +
      "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34"
  );
  return new X9ECParameters(curve, G, n, h);
}

function secp256r1(): any {
  // p = 2^224 (2^32 - 1) + 2^192 + 2^96 - 1
  var p: any = fromHex(
    "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"
  );
  var a: any = fromHex(
    "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"
  );
  var b: any = fromHex(
    "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"
  );
  //byte[] S = Hex.decode("C49D360886E704936A6678E1139D26B7819F7E90");
  var n: any = fromHex(
    "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"
  );
  var h: any = BigInteger.ONE;
  var curve: any = new ECCurveFp(p, a, b);
  var G: any = curve.decodePointHex(
    "04" +
      "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296" +
      "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5"
  );
  return new X9ECParameters(curve, G, n, h);
}

module.exports = {
  secp128r1,
  secp160k1,
  secp160r1,
  secp192k1,
  secp192r1,
  secp224r1,
  secp256r1,
};
