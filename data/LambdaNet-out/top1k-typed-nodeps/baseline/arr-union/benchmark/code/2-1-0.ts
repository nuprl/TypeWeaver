module.exports = function union(arr: Function): Array {
  var len: Number = arguments.length;
  var res: Array = [], i: Number = 0;

  while (len--) {
    var arg: Array = arrayify(arguments[i++]);

    for (var j = 0; j < arg.length; j++) {
      var ele: String = arg[j];

      if (res.indexOf(ele) === -1) {
        res.push(ele);
      }
    }
  }
  return res;
};

function arrayify(val: Array): Array {
  return Array.isArray(val) ? val : [val];
}
