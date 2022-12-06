'use strict';

function getThis() {
  return this;
}

export default function repeat(ele, num) {
  return Array.from({length: num}, getThis, ele);
};
