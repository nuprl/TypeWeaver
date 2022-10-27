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

  var m: Promise = re.exec({}.toString.call(val));
  return m[1].toLowerCase();
};
