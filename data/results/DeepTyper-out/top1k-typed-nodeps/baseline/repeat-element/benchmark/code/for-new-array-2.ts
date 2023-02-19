module.exports = repeat;

function repeat(ele: any, num: number): boolean {
  var arr: any[] = new Array(num);

  for (var i = num - 1; i >= 0; i--) {
    arr[i] = ele;
  }

  return arr;
}
