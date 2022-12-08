import stringify from '../';

var obj = { c: 8, b: [{z:6,y:5,x:4},7], a: 3 };
var s = stringify(obj, function (a: ny,  b: y) {
    return a.key < b.key ? 1 : -1;
});
console.log(s);