'use strict';

var Type = require('../type');

function resolveYamlMerge(data: any) {
  return data === '<<' || data === null;
}

module.exports = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});