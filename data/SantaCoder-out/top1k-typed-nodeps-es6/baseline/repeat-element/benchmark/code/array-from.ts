'use strict';

function getThis() {
  return this;
}

export default function repeat(ele: HTMLElement, num: number) {
  return Array.from({length: num}, getThis, ele);
};