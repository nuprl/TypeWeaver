var clone = require('clone');

module.exports = function(options: IOptions, defaults: IOptions) {
  options = options || {};

  Object.keys(defaults).forEach(function(key: string) {
    if (typeof options[key] === 'undefined') {
      options[key] = clone(defaults[key]);
    }
  });

  return options;
};