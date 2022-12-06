'use strict';

import Type from '../type';

function resolveYamlMerge(data: any) {
  return data === '<<' || data === null;
}

export default new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});