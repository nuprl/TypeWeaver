module.exports = function (arr: any) {
  return flatten(arr, []);
};

function flatten(arr: any, res: any): any {
  var len: number = arr.length;
  var num: number = 0;

  while (len--) {
    var i: number = num++;

    if (Array.isArray(arr[i])) {
      flatten(arr[i], res);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
