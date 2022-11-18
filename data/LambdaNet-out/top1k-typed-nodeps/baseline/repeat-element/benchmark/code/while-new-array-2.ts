module.exports = repeat;

function repeat(ele: string, num: number): object {
  var arr: object = new Array(num);
  var i: number = 0;

  while (num--) {
    arr[i++] = ele;
  }

  return arr;
}
