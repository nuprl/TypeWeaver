module.exports = repeat;

function repeat(ele: any, num: number): string {
  var arr: any[] = new Array(num);
  var i: number = 0;

  while (num--) {
    arr[i++] = ele;
  }

  return arr;
}
