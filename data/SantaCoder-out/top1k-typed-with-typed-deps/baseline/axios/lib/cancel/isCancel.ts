'use strict';

export default function isCancel(value: any) {
  return !!(value && value.__CANCEL__);
}