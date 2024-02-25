import util from 'util';

export default function () {
  var args = Array.prototype.slice.call(arguments, 0)
  args.forEach(function (arg) {
    if (!arg) {
      throw new TypeError('Bad arguments.')
    }
  })
  return util.format.apply(null, arguments)
};
