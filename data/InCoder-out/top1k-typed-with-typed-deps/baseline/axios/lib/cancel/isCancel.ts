'use strict';

export default function isCancel(value: ancel) {
  return !!(value && value.__CANCEL__);
}