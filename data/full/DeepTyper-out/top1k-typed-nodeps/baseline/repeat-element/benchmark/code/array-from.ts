'use strict';

function getThis(): string {
  return this;
}

module.exports = function repeat(ele: any, num: number): string {
  return Array.from({length: num}, getThis, ele);
};
