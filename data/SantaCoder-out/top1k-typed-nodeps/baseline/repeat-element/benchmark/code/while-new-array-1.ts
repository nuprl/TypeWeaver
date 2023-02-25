module.exports = repeat;

function repeat(ele: string, num: number) {
  var arr = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}