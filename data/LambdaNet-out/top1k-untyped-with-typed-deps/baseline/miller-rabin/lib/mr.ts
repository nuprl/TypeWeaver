var bn: any[] = require('bn.js');
var brorand: string = require('brorand');

function MillerRabin(rand: string): Void {
  this.rand = rand || new brorand.Rand();
}
module.exports = MillerRabin;

MillerRabin.create = function create(rand: string): string {
  return new MillerRabin(rand);
};

MillerRabin.prototype._randbelow = function _randbelow(n: Function): string {
  var len: number = n.bitLength();
  var min_bytes: number = Math.ceil(len / 8);

  // Generage random bytes until a number less than n is found.
  // This ensures that 0..n-1 have an equal probability of being selected.
  do
    var a: string = new bn(this.rand.generate(min_bytes));
  while (a.cmp(n) >= 0);

  return a;
};

MillerRabin.prototype._randrange = function _randrange(start: object, stop: object): Promise {
  // Generate a random number greater than or equal to start and less than stop.
  var size: string = stop.sub(start);
  return start.add(this._randbelow(size));
};

MillerRabin.prototype.test = function test(n: object, k: number, cb: Function): boolean {
  var len: number = n.bitLength();
  var red: string = bn.mont(n);
  var rone: string = new bn(1).toRed(red);

  if (!k)
    k = Math.max(1, (len / 48) | 0);

  // Find d and s, (n - 1) = (2 ^ s) * d;
  var n1: HTMLElement = n.subn(1);
  for (var s = 0; !n1.testn(s); s++) {}
  var d: string = n.shrn(s);

  var rn1: string = n1.toRed(red);

  var prime: boolean = true;
  for (; k > 0; k--) {
    var a: HTMLElement = this._randrange(new bn(2), n1);
    if (cb)
      cb(a);

    var x: HTMLElement = a.toRed(red).redPow(d);
    if (x.cmp(rone) === 0 || x.cmp(rn1) === 0)
      continue;

    for (var i = 1; i < s; i++) {
      x = x.redSqr();

      if (x.cmp(rone) === 0)
        return false;
      if (x.cmp(rn1) === 0)
        break;
    }

    if (i === s)
      return false;
  }

  return prime;
};

MillerRabin.prototype.getDivisor = function getDivisor(n: object, k: number): boolean {
  var len: number = n.bitLength();
  var red: string = bn.mont(n);
  var rone: string = new bn(1).toRed(red);

  if (!k)
    k = Math.max(1, (len / 48) | 0);

  // Find d and s, (n - 1) = (2 ^ s) * d;
  var n1: HTMLElement = n.subn(1);
  for (var s = 0; !n1.testn(s); s++) {}
  var d: string = n.shrn(s);

  var rn1: string = n1.toRed(red);

  for (; k > 0; k--) {
    var a: HTMLElement = this._randrange(new bn(2), n1);

    var g: number = n.gcd(a);
    if (g.cmpn(1) !== 0)
      return g;

    var x: HTMLElement = a.toRed(red).redPow(d);
    if (x.cmp(rone) === 0 || x.cmp(rn1) === 0)
      continue;

    for (var i = 1; i < s; i++) {
      x = x.redSqr();

      if (x.cmp(rone) === 0)
        return x.fromRed().subn(1).gcd(n);
      if (x.cmp(rn1) === 0)
        break;
    }

    if (i === s) {
      x = x.redSqr();
      return x.fromRed().subn(1).gcd(n);
    }
  }

  return false;
};
