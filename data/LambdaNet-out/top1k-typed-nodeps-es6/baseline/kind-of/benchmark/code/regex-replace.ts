var re: RegExp = /^\[object (\w+)\]$/;

export default function typeOf(val: String): String {
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
