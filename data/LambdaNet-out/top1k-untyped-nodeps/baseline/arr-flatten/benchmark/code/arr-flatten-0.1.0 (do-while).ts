module.exports = function () {
  var args: Array = [].slice.call(arguments);

  do {
    args = [].concat.apply([], args);
  } while (args.some(Array.isArray));

  return args;
};
