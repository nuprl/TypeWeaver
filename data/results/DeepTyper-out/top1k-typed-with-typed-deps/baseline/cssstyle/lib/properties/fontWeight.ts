'use strict';

var valid_weights: string[] = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'inherit',
];

module.exports.isValid = function isValid(v: string): boolean {
  return valid_weights.indexOf(v.toLowerCase()) !== -1;
};

module.exports.definition = {
  set: function(v: any) {
    this._setProperty('font-weight', v);
  },
  get: function() {
    return this.getPropertyValue('font-weight');
  },
  enumerable: true,
  configurable: true,
};
