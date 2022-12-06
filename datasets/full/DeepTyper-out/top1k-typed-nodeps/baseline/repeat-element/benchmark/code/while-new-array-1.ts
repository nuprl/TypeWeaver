module.exports = repeat;

function repeat(ele: any, num: number): string {
  var arr: any[] = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}
