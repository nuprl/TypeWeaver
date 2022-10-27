'use strict';

import utils from './utils';

export default (ast: Array, options: Object = {}) => {
  let stringify: Function = (node: Object, parent: Array = {}) => {
    let invalidBlock: Boolean = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode: Boolean = node.invalid === true && options.escapeInvalid === true;
    let output: String = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};

