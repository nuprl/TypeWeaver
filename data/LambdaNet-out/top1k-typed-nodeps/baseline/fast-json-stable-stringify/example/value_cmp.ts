var stringify: Function = require('../');

var obj: object = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
var s: any[] = stringify(obj, function (a: object, b: object) {
    return a.value < b.value ? 1 : -1;
});
console.log(s);
