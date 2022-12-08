'use strict';

const utils: string = require('./utils');

module.exports = (ast: string, options: object = {}) => {
  let stringify: Function = (node: object, parent: any[] = {}) => {
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

