module.exports = repeat;

function repeat(ele: String, num: String): Object {
  var arr: Object = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
}
