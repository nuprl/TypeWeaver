var clone = require('clone');

module.exports = function(options: Object,  defaults: Object) {
  options = options || {};

  Object.keys(defaults).forEach(function(key: any) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone(defaults[key]);
    }
  });

  return options;
};