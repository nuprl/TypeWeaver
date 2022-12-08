module.exports = repeat;

function repeat(ele: string, num: number): object {
  var arr: object = new Array(num);

  for (var i = num - 1; i >= 0; i--) {
    arr[i] = ele;
  }

  return arr;
}
