// https://rosettacode.org/wiki/Factors_of_an_integer#JavaScript

function factors(num: number): any[]
{
    function nested(x: string, y: string): string { return x + y; }

     var
      n_factors: any[] = [],
          i: number;

     for (i = 1; i <= Math.floor(Math.sqrt(num)); i += 1)
          if (num % i === 0)
              {
                     n_factors.push(i);
                     if (num / i !== i)
                          n_factors.push(num / i);
                    }
     n_factors.sort(function(a: number, b: number){return a - b;});  // numeric sort
     return n_factors;
}

/* Longer comment */
console.log(factors(45));  // [1,3,5,9,15,45]
console.log(factors(53));  // [1,53]
console.log(factors(64));  // [1,2,4,8,16,32,64]

function optParam(a: string, b: string = 2): string { return a + b; }
let ff: Function = (a: string, b: Function = optParam) => b(a);

let f2: Function = function(a: Function) { let v: string = a; return v }, v: number = 32;

let fun1: Function = function(n: number = v, m: number) { let x: string = n + m; return x };
const fun2: Function= function(n: string) { return n; };
var fun3: Function = function(n: string) { return n; };

let fun4: Function = function f4(n: string, m: string): string { return n + m; }
const fun5: Function = function f5(n: string): string { return n; }
var fun6: Function = function f6(n: string): string { return n; }

let fun7: Function = (a: number, b: number) => a + b;
const fun8: Function = (a: Function) => a;
var fun9: Function = (a: Function) => a;
let abc: any[] = "abc".split('')

let v1: number = 1
const v2: number = 2
var v3: number = v1

let v4: Function, v5: Function, v6: Function;
const v7: boolean = true, v8: boolean = false;
var v9: number = v7, v10: string = "foo";

var aaa: any[] = [1, 2, 3];
for (var aa in aaa) { aa }
for (let bb in aaa) { aa }
for (const cc in aaa) { let bb: number = 2; aa }
let bb: number = 42;

let input: any[] = [1,2];
let obj: object = { a: 42 };
let [first, second] = input;
let { a } = obj;
let xyz: any[] = input.map((_: number) => _ + 1).filter(function(x: number) { return x % 1 == 0; });

let $foo: number = 2;
let test: string = `abc`;

function pm({ a }): Void {
    return a;
}
console.log(pm(obj));
