var re = /^\[object (\w+)\]$/;

export default function typeOf(val: any) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  return {}.toString.call(val)
    .toLowerCase()
    .replace(re, '$1');
};