'use strict';

import margin from './margin.js';
import parsers from '../parsers.js';

export const definition: any = {
  set: parsers.subImplicitSetter('margin', 'top', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-top');
  },
  enumerable: true,
  configurable: true,
};
