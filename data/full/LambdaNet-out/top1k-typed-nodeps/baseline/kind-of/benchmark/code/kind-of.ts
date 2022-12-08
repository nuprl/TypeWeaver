var typeOf: Function = require('../..');

module.exports = function(val: number) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};
