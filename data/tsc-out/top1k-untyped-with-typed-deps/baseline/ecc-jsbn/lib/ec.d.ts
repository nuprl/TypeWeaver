export function ECCurveFp(q: any, a: any, b: any): void;
export class ECCurveFp {
    constructor(q: any, a: any, b: any);
    q: any;
    a: ECFieldElementFp;
    b: ECFieldElementFp;
    infinity: ECPointFp;
    reducer: any;
    getQ: typeof curveFpGetQ;
    getA: typeof curveFpGetA;
    getB: typeof curveFpGetB;
    equals: typeof curveFpEquals;
    getInfinity: typeof curveFpGetInfinity;
    fromBigInteger: typeof curveFpFromBigInteger;
    reduce: typeof curveReduce;
    encodePointHex: typeof curveFpEncodePointHex;
    decodePointHex(s: any): ECPointFp;
    encodeCompressedPointHex(p: any): string;
}
export function ECPointFp(curve: any, x: any, y: any, z: any): void;
export class ECPointFp {
    constructor(curve: any, x: any, y: any, z: any);
    curve: any;
    x: any;
    y: any;
    z: any;
    zinv: any;
    getX: typeof pointFpGetX;
    getY: typeof pointFpGetY;
    equals: typeof pointFpEquals;
    isInfinity: typeof pointFpIsInfinity;
    negate: typeof pointFpNegate;
    add: typeof pointFpAdd;
    twice: typeof pointFpTwice;
    multiply: typeof pointFpMultiply;
    multiplyTwo: typeof pointFpMultiplyTwo;
}
export function ECFieldElementFp(q: any, x: any): void;
export class ECFieldElementFp {
    constructor(q: any, x: any);
    x: any;
    q: any;
    equals: typeof feFpEquals;
    toBigInteger: typeof feFpToBigInteger;
    negate: typeof feFpNegate;
    add: typeof feFpAdd;
    subtract: typeof feFpSubtract;
    multiply: typeof feFpMultiply;
    square: typeof feFpSquare;
    divide: typeof feFpDivide;
    modDouble(x: any): any;
    getR(): BigInteger;
    r: BigInteger;
    modMult(x1: any, x2: any): any;
    modReduce(x: any): any;
    sqrt(): ECFieldElementFp;
    lucasSequence(P: any, Q: any, k: any): BigInteger[];
}
declare function curveFpGetQ(): any;
declare function curveFpGetA(): any;
declare function curveFpGetB(): any;
declare function curveFpEquals(other: any): any;
declare function curveFpGetInfinity(): any;
declare function curveFpFromBigInteger(x: any): ECFieldElementFp;
declare function curveReduce(x: any): void;
declare function curveFpEncodePointHex(p: any): string;
declare function pointFpGetX(): any;
declare class pointFpGetX {
    zinv: any;
}
declare function pointFpGetY(): any;
declare class pointFpGetY {
    zinv: any;
}
declare function pointFpEquals(other: any): any;
declare function pointFpIsInfinity(): boolean;
declare function pointFpNegate(): ECPointFp;
declare function pointFpAdd(b: any): any;
declare function pointFpTwice(): any;
declare function pointFpMultiply(k: any): any;
declare function pointFpMultiplyTwo(j: any, x: any, k: any): any;
declare function feFpEquals(other: any): any;
declare function feFpToBigInteger(): any;
declare function feFpNegate(): ECFieldElementFp;
declare function feFpAdd(b: any): ECFieldElementFp;
declare function feFpSubtract(b: any): ECFieldElementFp;
declare function feFpMultiply(b: any): ECFieldElementFp;
declare function feFpSquare(): ECFieldElementFp;
declare function feFpDivide(b: any): ECFieldElementFp;
import { BigInteger } from "jsbn";
export {};
