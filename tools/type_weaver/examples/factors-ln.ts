// https://rosettacode.org/wiki/Factors_of_an_integer#JavaScript

function factors(num: Number): Array
{
    function nested(x: String, y: String): String { return x + y; }

     var
      n_factors: Array = [],
          i: Number;

     for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
          if (num % i === 0)
              {
                     n_factors.push(i);
                     if (num / i !== i)
                          n_factors.push(num / i);
                    }
     n_factors.sort(function(a: Number, b: Number){return a - b;});  // numeric sort
     return n_factors;
}

/* Longer comment */
console.log(factors(45));  // [1,3,5,9,15,45]
console.log(factors(53));  // [1,53]
console.log(factors(64));  // [1,2,4,8,16,32,64]

function optParam(a: String, b: String = 2): String { return a + b; }
let ff: Function = (a: String, b: Function = optParam) => b(a);

let f2: Function = function(a: Function) { let v: String = a; return v }, v: Number = 32;

let fun1: Function = function(n: Number = v, m: Number) { let x: String = n + m; return x };
const fun2: Function= function(n: String) { return n; };
var fun3: Function = function(n: String) { return n; };

let fun4: Function = function f4(n: String, m: String): String { return n + m; }
const fun5: Function = function f5(n: String): String { return n; }
var fun6: Function = function f6(n: String): String { return n; }

let fun7: Function = (a: Number, b: Number) => a + b;
const fun8: Function = (a: Function) => a;
var fun9: Function = (a: Function) => a;
let abc: Array = "abc".split('')

let v1: Number = 1
const v2: Number = 2
var v3: Number = v1

let v4: Function, v5: Function, v6: Function;
const v7: Boolean = true, v8: Boolean = false;
var v9: Number = v7, v10: String = "foo";

var aaa: Array = [1, 2, 3];
for (var aa in aaa) { aa }
for (let bb in aaa) { aa }
for (const cc in aaa) { let bb: Number = 2; aa }
let bb: Number = 42;

let input: Array = [1,2];
let obj: Object = { a: 42 };
let [first, second] = input;
let { a } = obj;
let xyz: Array = input.map((_: Number) => _ + 1).filter(function(x: Number) { return x % 1 == 0; });

let $foo: Number = 2;
let test: String = `abc`;

function pm({ a }): Void {
    return a;
}
console.log(pm(obj));
