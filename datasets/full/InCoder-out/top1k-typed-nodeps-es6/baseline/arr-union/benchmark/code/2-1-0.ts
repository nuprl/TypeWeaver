export default function union(arr: Array<any>) {
  var len = arguments.length;
  var res = [], i = 0;

  while (len--) {
    var arg = arrayify(arguments[i++]);

    for (var j = 0; j < arg.length; j++) {
      var ele = arg[j];

      if (res.indexOf(ele) === -1) {
        res.push(ele);
      }
    }
  }
  return res;
};

function arrayify(val: ny) {
  return Array.isArray(val) ? val : [val];
}