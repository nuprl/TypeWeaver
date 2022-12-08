'use strict';

import { shorthandSetter } from '../parsers';
import { shorthandGetter } from '../parsers';
import './borderWidth';
import './borderStyle';
import './borderColor';

var shorthand_for = {
  'border-width',
  'border-style',
  'border-color',
};

var myShorthandSetter = shorthandSetter('border', shorthand_for);
var myShorthandGetter = shorthandGetter('border', shorthand_for);

module.exports.definition = {
  set: function(v) {
    if (v.toString().toLowerCase() === 'none') {
      v = '';
    }
    myShorthandSetter.call(this, v);
    this.removeProperty('border-top');
    this.removeProperty('border-left');
    this.removeProperty('border-right');
    this.removeProperty('border-bottom');
    this._values['border-top'] = this._values.border;
    this._values['border-left'] = this._values.border;
    this._values['border-right'] = this._values.border;
    this._values['border-bottom'] = this._values.border;
  },
  get: myShorthandGetter,
  enumerable: true,
  configurable: true,
};
