var typeOf = require('../..');

module.exports = function(val: string) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};