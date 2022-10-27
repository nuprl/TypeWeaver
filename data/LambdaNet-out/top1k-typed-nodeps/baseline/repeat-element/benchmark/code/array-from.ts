'use strict';

function getThis(): Object {
  return this;
}

module.exports = function repeat(ele: Function, num: Number): Array {
  return Array.from({length: num}, getThis, ele);
};
