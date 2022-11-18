module.exports = repeat;

function repeat(ele: string, num: number): object {
  var arr: object = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}
