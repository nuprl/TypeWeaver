'use strict';

const utils: any = require('./utils');

module.exports = (ast, options = {}) => {
  let stringify: string = (node, parent = {}) => {
    let invalidBlock: boolean = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode: boolean = node.invalid === true && options.escapeInvalid === true;
    let output: string = '';

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

