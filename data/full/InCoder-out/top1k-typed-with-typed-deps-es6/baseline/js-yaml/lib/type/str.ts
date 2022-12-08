'use strict';

import Type from '../type';

export default new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data: y) { return data !== null ? data : ''; }
});