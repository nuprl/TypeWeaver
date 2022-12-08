'use strict';

import fill from 'fill-range';
import utils from './utils';

const compile: boolean = (ast, options = {}) => {
  let walk: any = (node, parent = {}) => {
    let invalidBlock: boolean = utils.isInvalidBrace(parent);
    let invalidNode: boolean = node.invalid === true && options.escapeInvalid === true;
    let invalid: boolean = invalidBlock === true || invalidNode === true;
    let prefix: string = options.escapeInvalid === true ? '\\' : '';
    let output: string = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args: any[] = utils.reduce(node.nodes);
      let range: any = fill(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

export default compile;
