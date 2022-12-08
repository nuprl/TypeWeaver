'use strict';

export default function isCancel(value: ancelable) {
  return !!(value && value.__CANCEL__);
}