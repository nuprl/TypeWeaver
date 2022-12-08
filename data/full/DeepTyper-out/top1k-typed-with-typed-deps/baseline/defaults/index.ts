var clone: any = require('clone');

module.exports = function(options: any, defaults: any) {
  options = options || {};

  Object.keys(defaults).forEach(function(key: string) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone(defaults[key]);
    }
  });

  return options;
};