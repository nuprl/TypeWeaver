var r: any;

module.exports = function rand(len: number): any {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand: any): void {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len: number): any {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n: number): any {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res: any = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n: any): any {
      var arr: any = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n: any): any {
      var arr: any = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto: any = require('crypto');
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n: number): any {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}
