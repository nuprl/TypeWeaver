/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api public
 */

export default function(a: any, b): any{
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
