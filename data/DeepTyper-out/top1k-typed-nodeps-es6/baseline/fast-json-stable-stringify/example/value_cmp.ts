import stringify from '../';

var obj: any = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
var s: string = stringify(obj, function (a: any, b: any) {
    return a.value < b.value ? 1 : -1;
});
console.log(s);