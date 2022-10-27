'use strict';

import margin from './margin.js';
import parsers from '../parsers.js';

export const definition: Object = {
  set: parsers.subImplicitSetter('margin', 'bottom', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-bottom');
  },
  enumerable: true,
  configurable: true,
};
