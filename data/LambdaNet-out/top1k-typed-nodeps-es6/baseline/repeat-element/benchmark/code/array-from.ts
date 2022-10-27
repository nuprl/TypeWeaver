'use strict';

function getThis(): Object {
  return this;
}

export default function repeat(ele: Function, num: Number): Array {
  return Array.from({length: num}, getThis, ele);
};
