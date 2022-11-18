'use strict';

function getThis(): object {
  return this;
}

export default function repeat(ele: Function, num: number): any[] {
  return Array.from({length: num}, getThis, ele);
};
