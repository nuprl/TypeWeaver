export default repeat;

function repeat(ele: any,  num: number) {
  var arr = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}