/**
 * http://github.com/CodingFu/typeof
 */
// var typeOf = require('typeof');
var toString: string = Object.prototype.toString;

export default function(val: string) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};

function typeOf(object: any): any {
  var type = typeof object;
  if (type === 'undefined') {
    return 'undefined';
  }
  if (object) {
    type = object.constructor.name;
  } else if (type === 'object') {
    type = toString.call(object).slice(8, -1);
  }
  return type.toLowerCase();
}
