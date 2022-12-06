'use strict';

import margin from './margin.js';
import parsers from '../parsers.js';

export const definition: any = {
  set: parsers.subImplicitSetter('margin', 'left', margin.isValid, margin.parser),
  get: function() {
    return this.getPropertyValue('margin-left');
  },
  enumerable: true,
  configurable: true,
};
