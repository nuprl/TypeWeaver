var stringify: Function = require('../');

var obj: Object = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
var s: Array = stringify(obj, function (a: Object, b: Object) {
    return a.key < b.key ? 1 : -1;
});
console.log(s);
