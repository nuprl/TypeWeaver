'use strict';

var Type = require('../type');

function resolveYamlBoolean(data: any) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data: any) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object: any) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

module.exports = new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object: ny) { return object ? 'true' : 'false'; },
    uppercase: function (object: ny) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object: ny) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});