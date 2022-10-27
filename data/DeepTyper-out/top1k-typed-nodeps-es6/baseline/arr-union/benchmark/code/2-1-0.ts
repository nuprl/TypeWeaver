export default function union(arr: any): any {
  var len: number = arguments.length;
  var res: any[] = [], i = 0;

  while (len--) {
    var arg: any = arrayify(arguments[i++]);

    for (var j = 0; j < arg.length; j++) {
      var ele: any = arg[j];

      if (res.indexOf(ele) === -1) {
        res.push(ele);
      }
    }
  }
  return res;
};

function arrayify(val: any): any {
  return Array.isArray(val) ? val : [val];
}
