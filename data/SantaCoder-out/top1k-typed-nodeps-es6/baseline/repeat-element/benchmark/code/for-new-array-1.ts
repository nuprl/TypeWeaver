export default repeat;

function repeat(ele: any, num: number) {
  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
}