module.exports = repeat;

function repeat(ele: any, num: number): string {
  var arr: any[] = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
}
