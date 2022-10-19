export default repeat;

function repeat(ele, num) {
  var arr = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}
