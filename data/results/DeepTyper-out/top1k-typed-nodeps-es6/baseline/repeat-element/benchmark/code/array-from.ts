'use strict';

function getThis(): boolean {
  return this;
}

export default function repeat(ele: any, num: number): boolean {
  return Array.from({length: num}, getThis, ele);
};
