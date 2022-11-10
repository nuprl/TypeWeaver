'use strict';

function getThis() {
  return this;
}

module.exports = function repeat(ele: any,  num: number) {
  return Array.from({length: num}, getThis, ele);
};