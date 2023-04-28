/* global BigInt */
/* eslint-disable new-cap, no-new, no-unused-expressions */

var benchmark = require('benchmark');
var crypto = require('crypto');
var bn = require('../');
var bignum;
try {
  bignum = require('bignum');
} catch (err) {
  console.log('Load bignum error: ' + err.message.split('\n')[0]);
}
var sjcl = require('eccjs').sjcl.bn;
var bigi = require('bigi');
var BigInteger = require('js-big-integer').BigInteger;
var SilentMattBigInteger = require('biginteger').BigInteger;
var XorShift128Plus = require('xorshift.js').XorShift128Plus;
var benchmarks = [];

var selfOnly = process.env.SELF_ONLY;
var seed = process.env.SEED || crypto.randomBytes(16).toString('hex');
console.log('Seed: ' + seed);
var prng = new XorShift128Plus(seed);

var fixtures = [];
var findex = 0;
function findexRefresh () {
  findex = 0;
}

function add (op: string, obj: any) {
  benchmarks.push({
    name: op,
    start: function start () {
      var suite = new benchmark.Suite();

      console.log('Benchmarking: ' + op);

      Object.keys(obj).forEach(function (name: string) {
        if (name === 'BigInt' && typeof BigInt === 'undefined') {
          return;
        }

        if (name === 'bignum' && bignum === undefined) {
          return;
        }

        if (!selfOnly || name === 'bn.js') {
          var testFn = obj[name];
          suite.add(name + '#' + op, function () {
            var fixture = fixtures[findex++];
            if (findex === fixtures.length) {
              findexRefresh();
            }

            testFn(fixture);
          }, {
            onStart: findexRefresh,
            onCycle: findexRefresh
          });
        }
      });

      suite
        .on('cycle', function (event: any) {
          console.log(String(event.target));
        })
        .on('complete', function () {
          console.log('------------------------');
          console.log('Fastest is ' + this.filter('fastest')[0].name);
        })
        .run();

      console.log('========================');
    }
  });
}

function start () {
  var re = process.argv[2] ? new RegExp(process.argv[2], 'i') : /./;

  benchmarks
    .filter(function (b: any) {
      return re.test(b.name);
    })
    .forEach(function (b: any) {
      b.start();
    });
}

if (/fast/i.test(process.argv[3])) {
  console.log('Running in fast mode...');
  benchmark.options.minTime = 0.3;
  benchmark.options.maxTime = 1;
  benchmark.options.minSamples = 3;
} else {
  benchmark.options.minTime = 1;
}

while (fixtures.length < 25) {
  var fixture = {};
  fixtures.push(fixture);

  var a = prng.randomBytes(32).toString('hex');
  var b = prng.randomBytes(32).toString('hex');
  var aj = prng.randomBytes(768).toString('hex');
  var bj = prng.randomBytes(768).toString('hex');

  fixture.a10base = new bn(a, 16).toString(10);
  fixture.a16base = new bn(a, 16).toString(16);

  // BN
  fixture.a1 = new bn(a, 16);
  fixture.b1 = new bn(b, 16);
  fixture.a1j = new bn(aj, 16);
  fixture.b1j = new bn(bj, 16);
  fixture.as1 = fixture.a1.mul(fixture.a1).iaddn(0x2adbeef);
  fixture.am1 = fixture.a1.toRed(bn.red('k256'));
  fixture.pow1 = fixture.am1.fromRed();

  // BigInt
  fixture.a2 = BigInt(fixture.a1.toString(10));
  fixture.b2 = BigInt(fixture.b1.toString(10));
  fixture.a2j = BigInt(fixture.a1j.toString(10));
  fixture.b2j = BigInt(fixture.b1j.toString(10));
  fixture.as2 = fixture.a2 * fixture.a2 + 0x2adbeefn;

  // bignum
  if (bignum) {
    fixture.a3 = new bignum(a, 16);
    fixture.b3 = new bignum(b, 16);
    fixture.a3j = new bignum(aj, 16);
    fixture.b3j = new bignum(bj, 16);
    fixture.as3 = fixture.a3.mul(fixture.a3).add(0x2adbeef);
  }

  // bigi
  fixture.a4 = new bigi(a, 16);
  fixture.b4 = new bigi(b, 16);
  fixture.a4j = new bigi(aj, 16);
  fixture.b4j = new bigi(bj, 16);
  fixture.as4 = fixture.a4.multiply(fixture.a4).add(bigi.valueOf(0x2adbeef));

  // sjcl
  fixture.a5 = new sjcl(a, 16);
  fixture.b5 = new sjcl(b, 16);
  fixture.a5j = new sjcl(aj, 16);
  fixture.b5j = new sjcl(bj, 16);
  // fixture.as5 = fixture.a5.mul(fixture.a5).add(0x2adbeef);
  fixture.am5 = new sjcl.prime.p256k(fixture.a5);

  // BigInteger
  fixture.a6 = new BigInteger(a, 16);
  fixture.b6 = new BigInteger(b, 16);
  fixture.a6j = new BigInteger(aj, 16);
  fixture.b6j = new BigInteger(bj, 16);
  fixture.as6 = fixture.a6.multiply(fixture.a6).add(
    new BigInteger('2adbeef', 16));

  // SilentMattBigInteger
  fixture.a7 = SilentMattBigInteger.parse(a, 16);
  fixture.b7 = SilentMattBigInteger.parse(b, 16);
  fixture.a7j = SilentMattBigInteger.parse(aj, 16);
  fixture.b7j = SilentMattBigInteger.parse(aj, 16);
  fixture.as7 = fixture.a7.multiply(fixture.a7).add(
    SilentMattBigInteger.parse('2adbeef', 16));
}

add('create-10', {
  'bn.js': function (fixture: any) {
    new bn(fixture.a10base, 10);
  },
  BigInt: function (fixture: any) {
    BigInt(fixture.a10base);
  },
  bignum: function (fixture: any) {
    new bignum(fixture.a10base, 10);
  },
  bigi: function (fixture: any) {
    new bigi(fixture.a10base, 10);
  },
  yaffle: function (fixture: any) {
    new BigInteger(fixture.a10base, 10);
  },
  'silentmatt-biginteger': function (fixture: any) {
    SilentMattBigInteger.parse(fixture.a10base, 10);
  }
});

add('create-hex', {
  'bn.js': function (fixture: any) {
    new bn(fixture.a16base, 16);
  },
  bignum: function (fixture: any) {
    new bignum(fixture.a16base, 16);
  },
  bigi: function (fixture: any) {
    new bigi(fixture.a16base, 16);
  },
  sjcl: function (fixture: any) {
    new sjcl(fixture.a16base);
  },
  yaffle: function (fixture: any) {
    new BigInteger(fixture.a16base, 16);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    SilentMattBigInteger.parse(fixture.a16base, 16);
  }
});

add('toString-10', {
  'bn.js': function (fixture: any) {
    fixture.a1.toString(10);
  },
  BigInt: function (fixture: any) {
    fixture.a2.toString(10);
  },
  bignum: function (fixture: any) {
    fixture.a3.toString(10);
  },
  bigi: function (fixture: any) {
    fixture.a4.toString(10);
  },
  yaffle: function (fixture: any) {
    fixture.a6.toString(10);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.a7.toString(10);
  }
});

add('toString-hex', {
  'bn.js': function (fixture: any) {
    fixture.a1.toString(16);
  },
  BigInt: function (fixture: any) {
    fixture.a2.toString(16);
  },
  bignum: function (fixture: any) {
    fixture.a3.toString(16);
  },
  bigi: function (fixture: any) {
    fixture.a4.toString(16);
  },
  sjcl: function (fixture: any) {
    fixture.a5.toString(16);
  },
  yaffle: function (fixture: any) {
    fixture.a6.toString(16);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.a7.toString(16);
  }
});

add('add', {
  'bn.js': function (fixture: any) {
    fixture.a1.add(fixture.b1);
  },
  BigInt: function (fixture: any) {
    fixture.a2 + fixture.b2;
  },
  bignum: function (fixture: any) {
    fixture.a3.add(fixture.b3);
  },
  bigi: function (fixture: any) {
    fixture.a4.add(fixture.b4);
  },
  sjcl: function (fixture: any) {
    fixture.a5.add(fixture.b5);
  },
  yaffle: function (fixture: any) {
    fixture.a6.add(fixture.b6);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.a7.add(fixture.a7);
  }
});

add('sub', {
  'bn.js': function (fixture: any) {
    fixture.b1.sub(fixture.a1);
  },
  BigInt: function (fixture: any) {
    fixture.a2 - fixture.b2;
  },
  bignum: function (fixture: any) {
    fixture.b3.sub(fixture.a3);
  },
  bigi: function (fixture: any) {
    fixture.b4.subtract(fixture.a4);
  },
  sjcl: function (fixture: any) {
    fixture.b5.sub(fixture.a5);
  },
  yaffle: function (fixture: any) {
    fixture.b6.subtract(fixture.a6);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.b7.subtract(fixture.a7);
  }
});

add('mul', {
  'bn.js': function (fixture: Fixture) {
    fixture.a1.mul(fixture.b1);
  },
  'bn.js[FFT]': function (fixture: any) {
    fixture.a1.mulf(fixture.b1);
  },
  BigInt: function (fixture: any) {
    fixture.a2 * fixture.b2;
  },
  bignum: function (fixture: any) {
    fixture.a3.mul(fixture.b3);
  },
  bigi: function (fixture: any) {
    fixture.a4.multiply(fixture.b4);
  },
  sjcl: function (fixture: any) {
    fixture.a5.mul(fixture.b5);
  },
  yaffle: function (fixture: any) {
    fixture.a6.multiply(fixture.b6);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.a7.multiply(fixture.b7);
  }
});

add('mul-jumbo', {
  'bn.js': function (fixture: Fixture) {
    fixture.a1j.mul(fixture.b1j);
  },
  'bn.js[FFT]': function (fixture: any) {
    fixture.a1j.mulf(fixture.b1j);
  },
  BigInt: function (fixture: any) {
    fixture.a2j * fixture.b2j;
  },
  bignum: function (fixture: any) {
    fixture.a3j.mul(fixture.b3j);
  },
  bigi: function (fixture: any) {
    fixture.a4j.multiply(fixture.b4j);
  },
  sjcl: function (fixture: any) {
    fixture.a5j.mul(fixture.b5j);
  },
  yaffle: function (fixture: any) {
    fixture.a6j.multiply(fixture.b6j);
  },
  'silentmatt-biginteger': function (fixture: any) {
    fixture.a7j.multiply(fixture.b7j);
  }
});

add('sqr', {
  'bn.js': function (fixture: any) {
    fixture.a1.mul(fixture.a1);
  },
  BigInt: function (fixture: any) {
    fixture.a2 * fixture.a2;
  },
  bignum: function (fixture: any) {
    fixture.a3.mul(fixture.a3);
  },
  bigi: function (fixture: any) {
    fixture.a4.square();
  },
  sjcl: function (fixture: any) {
    fixture.a5.mul(fixture.a5);
  },
  yaffle: function (fixture: any) {
    fixture.a6.multiply(fixture.a6);
  },
  'silentmatt-biginteger': function (fixture: Fixture) {
    fixture.a7.multiply(fixture.a7);
  }
});

add('div', {
  'bn.js': function (fixture: any) {
    fixture.as1.div(fixture.a1);
  },
  BigInt: function (fixture: any) {
    fixture.as2 / fixture.a2;
  },
  bignum: function (fixture: any) {
    fixture.as3.div(fixture.a3);
  },
  bigi: function (fixture: any) {
    fixture.as4.divide(fixture.a4);
  },
  yaffle: function (fixture: any) {
    fixture.as6.divide(fixture.a6);
  },
  'silentmatt-biginteger': function (fixture: any) {
    fixture.as7.divide(fixture.a7);
  }
});

add('mod', {
  'bn.js': function (fixture: any) {
    fixture.as1.mod(fixture.a1);
  },
  BigInt: function (fixture: any) {
    fixture.as2 / fixture.a2;
  },
  bignum: function (fixture: any) {
    fixture.as3.mod(fixture.a3);
  },
  bigi: function (fixture: any) {
    fixture.as4.mod(fixture.a4);
  },
  yaffle: function (fixture: any) {
    var remainder = fixture.as6.remainder(fixture.a6);
    return remainder.compareTo(BigInteger.ZERO) < 0
      ? remainder.add(fixture.a6)
      : remainder;
  },
  'silentmatt-biginteger': function (fixture: any) {
    var remainder = fixture.as7.remainder(fixture.a7);
    return remainder.compare(BigInteger.ZERO) < 0
      ? remainder.add(fixture.a7)
      : remainder;
  }
});

add('mul-mod k256', {
  'bn.js': function (fixture: any) {
    fixture.am1.redSqr();
  },
  sjcl: function (fixture: any) {
    fixture.am5.square().fullReduce();
  }
});

var prime1;
if (bignum) {
  prime1 = new bignum(
    'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
    16);
}
// var prime4 = new bigi(
//   'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f',
//   16);
var prime5 = new sjcl(
  'fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f');

add('pow k256', {
  'bn.js': function (fixture: any) {
    fixture.am1.redPow(fixture.pow1);
  },
  bignum: function (fixture: any) {
    fixture.a3.powm(fixture.a3, prime1);
  }
});

add('invm k256', {
  'bn.js': function (fixture: any) {
    fixture.am1.redInvm();
  },
  sjcl: function (fixture: Fixture) {
    fixture.am5.inverseMod(prime5);
  }
});

add('gcd', {
  'bn.js': function (fixture: any) {
    fixture.a1.gcd(fixture.b1);
  },
  bigi: function (fixture: any) {
    fixture.a4.gcd(fixture.b4);
  }
});

add('egcd', {
  'bn.js': function (fixture: any) {
    fixture.a1.egcd(fixture.b1);
  }
});

add('bitLength', {
  'bn.js': function () {
    fixture.a1.bitLength();
  }
});

add('toArray', {
  'bn.js': function () {
    fixture.a1j.toArray();
  }
});

start();