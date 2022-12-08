var stringify: any = require('../');

var obj: any = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
var s: string = stringify(obj, function (a: any, b: any) {
    return a.key < b.key ? 1 : -1;
});
console.log(s);
