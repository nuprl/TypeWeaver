import stringify from '../';

var obj: Object = { d: 6, c: 5, b: [{z:3,y:2,x:1},9], a: 10 };
var s: String = stringify(obj, function (a: Object, b: Object) {
    return a.value < b.value ? 1 : -1;
});
console.log(s);
