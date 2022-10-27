export default repeat;

function repeat(ele: String, num: Number): Object {
  var arr: Object = new Array(num);
  var i: Number = 0;

  while (num--) {
    arr[i++] = ele;
  }

  return arr;
}
