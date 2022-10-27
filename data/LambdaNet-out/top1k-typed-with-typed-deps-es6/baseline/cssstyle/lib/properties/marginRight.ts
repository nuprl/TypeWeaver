'use strict';

import margin from './margin.js';
import parsers from '../parsers.js';

export const definition: Object = {
  set: parsers.subImplicitSetter('margin', 'right', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-right');
  },
  enumerable: true,
  configurable: true,
};
