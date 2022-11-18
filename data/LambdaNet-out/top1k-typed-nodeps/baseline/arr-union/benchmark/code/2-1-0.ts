module.exports = function union(arr: Function): any[] {
  var len: number = arguments.length;
  var res: any[] = [], i: number = 0;

  while (len--) {
    var arg: any[] = arrayify(arguments[i++]);

    for (var j = 0; j < arg.length; j++) {
      var ele: string = arg[j];

      if (res.indexOf(ele) === -1) {
        res.push(ele);
      }
    }
  }
  return res;
};

function arrayify(val: any[]): any[] {
  return Array.isArray(val) ? val : [val];
}
