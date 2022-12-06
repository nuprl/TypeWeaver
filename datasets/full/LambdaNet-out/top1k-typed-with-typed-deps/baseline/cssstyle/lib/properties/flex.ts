'use strict';

var shorthandParser: Function = require('../parsers').shorthandParser;
var shorthandSetter: Function = require('../parsers').shorthandSetter;
var shorthandGetter: Function = require('../parsers').shorthandGetter;

var shorthand_for: object = {
  'flex-grow': require('./flexGrow'),
  'flex-shrink': require('./flexShrink'),
  'flex-basis': require('./flexBasis'),
};

var myShorthandSetter: Function = shorthandSetter('flex', shorthand_for);

module.exports.isValid = function isValid(v: any[]): boolean {
  return shorthandParser(v, shorthand_for) !== undefined;
};

module.exports.definition = {
  set: function(v: string) {
    var normalizedValue: string = String(v)
      .trim()
      .toLowerCase();

    if (normalizedValue === 'none') {
      myShorthandSetter.call(this, '0 0 auto');
      return;
    }
    if (normalizedValue === 'initial') {
      myShorthandSetter.call(this, '0 1 auto');
      return;
    }
    if (normalizedValue === 'auto') {
      this.removeProperty('flex-grow');
      this.removeProperty('flex-shrink');
      this.setProperty('flex-basis', normalizedValue);
      return;
    }

    myShorthandSetter.call(this, v);
  },
  get: shorthandGetter('flex', shorthand_for),
  enumerable: true,
  configurable: true,
};
