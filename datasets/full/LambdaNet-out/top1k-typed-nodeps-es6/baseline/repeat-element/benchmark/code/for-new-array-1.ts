export default repeat;

function repeat(ele: string, num: string): object {
  var arr: object = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
}
