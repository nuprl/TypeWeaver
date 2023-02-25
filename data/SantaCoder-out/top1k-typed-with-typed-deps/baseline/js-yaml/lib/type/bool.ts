'use strict';

var Type = require('../type');

function resolveYamlBoolean(data: string) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data: string) {
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
    lowercase: function (object: any) { return object ? 'true' : 'false'; },
    uppercase: function (object: any) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object: any) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});