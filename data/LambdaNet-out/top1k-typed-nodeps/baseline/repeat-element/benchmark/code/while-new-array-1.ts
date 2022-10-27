module.exports = repeat;

function repeat(ele: String, num: Number): Object {
  var arr: Object = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}
