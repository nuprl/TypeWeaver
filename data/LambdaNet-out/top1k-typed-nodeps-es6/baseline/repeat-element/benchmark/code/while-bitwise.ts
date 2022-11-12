
export default repeat;

function repeat(ele: Function, num: Number): Array {
  var arr: Array = [ele];
  var res: Array = [];

  while (num > 0) {
    if (num & 1) {
      res.push.apply(res, arr);
    }
    num >>= 1;
    arr.push.apply(arr, arr);
  }
  return res;
}
