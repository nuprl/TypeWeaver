export default repeat;

function repeat(ele: any,  num: number) {
  var arr = new Array(num);

  for (var i = num - 1; i >= 0; i--) {
    arr[i] = ele;
  }

  return arr;
}