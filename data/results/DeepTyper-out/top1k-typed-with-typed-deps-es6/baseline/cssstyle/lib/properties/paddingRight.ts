'use strict';

import padding from './padding.js';
import parsers from '../parsers.js';

export const definition: any = {
  set: parsers.subImplicitSetter('padding', 'right', padding.isValid, padding.parser),
  get: function() {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true,
};
