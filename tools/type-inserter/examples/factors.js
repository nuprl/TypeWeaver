// https://rosettacode.org/wiki/Factors_of_an_integer#JavaScript

function factors(num)
{
    function nested(x, y) { return x + y; }

     var
      n_factors = [],
          i;

     for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
          if (num % i === 0)
              {
                     n_factors.push(i);
                     if (num / i !== i)
                          n_factors.push(num / i);
                    }
     n_factors.sort(function(a, b){return a - b;});  // numeric sort
     return n_factors;
}

/* Longer comment */
console.log(factors(45));  // [1,3,5,9,15,45]
console.log(factors(53));  // [1,53]
console.log(factors(64));  // [1,2,4,8,16,32,64]

function optParam(a, b = 2) { return a + b; }
let ff = (a, b = optParam) => b(a);

let f2 = function(a) { let v = a; return v }, v = 32;

let fun1 = function(n = v, m) { let x = n + m; return x };
const fun2= function(n) { return n; };
var fun3 = function(n) { return n; };

let fun4 = function f4(n, m) { return n + m; }
const fun5 = function f5(n) { return n; }
var fun6 = function f6(n) { return n; }

let fun7 = (a, b) => a + b;
const fun8 = (a) => a;
var fun9 = a => a;
let abc = "abc".split('')

let v1 = 1
const v2 = 2
var v3 = v1

let v4, v5, v6;
const v7 = true, v8 = false;
var v9 = v7, v10 = "foo";

var aaa = [1, 2, 3];
for (var aa in aaa) { aa }
for (let bb in aaa) { aa }
for (const cc in aaa) { let bb = 2; aa }
let bb = 42;

let input = [1,2];
let obj = { a: 42 };
let [first, second] = input;
let { a } = obj;
let xyz = input.map(_ => _ + 1).filter(function(x) { return x % 1 == 0; });

let $foo = 2;
let test = `abc`;

function pm({ a }) {
    return a;
}
console.log(pm(obj));
