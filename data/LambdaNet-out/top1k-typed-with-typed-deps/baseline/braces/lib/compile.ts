'use strict';

const fill: Function = require('fill-range');
const utils: String = require('./utils');

const compile: Function = (ast: Array, options: Object = {}) => {
  let walk: Function = (node: Object, parent: Array = {}) => {
    let invalidBlock: Number = utils.isInvalidBrace(parent);
    let invalidNode: Number = node.invalid === true && options.escapeInvalid === true;
    let invalid: Boolean = invalidBlock === true || invalidNode === true;
    let prefix: String = options.escapeInvalid === true ? '\\' : '';
    let output: String = '';

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
      let args: Array = utils.reduce(node.nodes);
      let range: String = fill(...args, { ...options, wrap: false, toRegex: true });

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

module.exports = compile;
