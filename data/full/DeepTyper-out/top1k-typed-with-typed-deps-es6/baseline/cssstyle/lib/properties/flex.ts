'use strict';

import { shorthandParser } from '../parsers';
import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './flexGrow';
import './flexShrink';
import './flexBasis';

var shorthand_for: any = {
  'flex-grow',
  'flex-shrink',
  'flex-basis',
};

var myShorthandSetter: any = shorthandSetter('flex', shorthand_for);

module.exports.isValid = function isValid(v: any): boolean {
  return shorthandParser(v, shorthand_for) !== undefined;
};

module.exports.definition = {
  set: function(v: any) {
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
