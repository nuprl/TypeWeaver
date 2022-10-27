var typeOf: Function = require('../..');

module.exports = function(val: Number) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};
