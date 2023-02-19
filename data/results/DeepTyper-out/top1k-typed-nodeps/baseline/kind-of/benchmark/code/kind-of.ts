var typeOf: any = require('../..');

module.exports = function(val: any) {
  if (val === 'arguments') {
    return typeOf(arguments);
  }
  return typeOf(val);
};
