module.exports = repeat;

function repeat(ele: String, num: Number): Object {
  var arr: Object = new Array(num);

  for (var i = num - 1; i >= 0; i--) {
    arr[i] = ele;
  }

  return arr;
}
