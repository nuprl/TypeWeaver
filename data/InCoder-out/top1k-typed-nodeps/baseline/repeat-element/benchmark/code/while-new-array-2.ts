module.exports = repeat;

function repeat(ele: any,  num: number) {
  var arr = new Array(num);
  var i = 0;

  while (num--) {
    arr[i++] = ele;
  }

  return arr;
}