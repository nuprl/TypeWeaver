module.exports = function typeOf(val: number): string {
  if (val === null) return 'null';
  if (val === undefined) {
    return 'undefined';
  }

  var type: string = typeof val;
  switch (type) {
    case 'string':
    case 'number':
    case 'boolean': {
      return type;
    }
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};
