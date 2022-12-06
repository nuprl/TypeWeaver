
export default repeat;

function repeat(ele: Function, num: number): any[] {
  var arr: any[] = [ele];
  var res: any[] = [];

  while (num > 0) {
    if (num & 1) {
      res.push.apply(res, arr);
    }
    num >>= 1;
    arr.push.apply(arr, arr);
  }
  return res;
}
