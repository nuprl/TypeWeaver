// https://rosettacode.org/wiki/Factors_of_an_integer#JavaScript

function factors(num: number): number
{
    function nested(x: any, y: number): number { return x + y; }

     var
      n_factors: any[] = [],
          i;

     for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
          if (num % i === 0)
              {
                     n_factors.push(i);
                     if (num / i !== i)
                          n_factors.push(num / i);
                    }
     n_factors.sort(function(a: any, b: number){return a - b;});  // numeric sort
     return n_factors;
}

/* Longer comment */
console.log(factors(45));  // [1,3,5,9,15,45]
console.log(factors(53));  // [1,53]
console.log(factors(64));  // [1,2,4,8,16,32,64]

function optParam(a, b = 2) { return a + b; }
let ff: number = (a, b = optParam) => b(a);

let f2: number = function(a: any) { let v: number = a; return v }, v = 32;

let fun1: number = function(n = v, m) { let x: any = n + m; return x };
const fun2: number= function(n: number) { return n; };
var fun3: number = function(n: number) { return n; };

let fun4: number = function f4(n: number, m: any): number { return n + m; }
const fun5: number = function f5(n: number): number { return n; }
var fun6: number = function f6(n: number): number { return n; }

let fun7: number = (a: number, b: number) => a + b;
const fun8: number = (a: any) => a;
var fun9: string = (a: any) => a;
let abc: string = "abc".split('')

let v1: number = 1
const v2: number = 2
var v3: number = v1

let v4: number, v5, v6;
const v7: boolean = true, v8 = false;
var v9: any = v7, v10 = "foo";

var aaa: any[] = [1, 2, 3];
for (var aa in aaa) { aa }
for (let bb in aaa) { aa }
for (const cc in aaa) { let bb: number = 2; aa }
let bb: number = 42;

let input: number[] = [1,2];
let obj: complex = { a: 42 };
let [first, second] = input;
let { a } = obj;
let xyz: any[] = input.map((_: any) => _ + 1).filter(function(x: any) { return x % 1 == 0; });

let $foo = 2;
let test: any = `abc`;

function pm({ a }) {
    return a;
}
console.log(pm(obj));
