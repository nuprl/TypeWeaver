var clone = require('clone');

module.exports = function(options: any,  defaults: any) {
  options = options || {};

  Object.keys(defaults).forEach(function(key: any) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone(defaults[key]);
    }
  });

  return options;
};