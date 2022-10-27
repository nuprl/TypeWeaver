'use strict';

import padding from './padding.js';
import parsers from '../parsers.js';

export const definition = {
  set: parsers.subImplicitSetter('padding', 'top', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-top');
  },
  enumerable: true,
  configurable: true,
};
