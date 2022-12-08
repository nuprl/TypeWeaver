export default repeat;

function repeat(ele: any, num: number): boolean {
  var arr: any[] = new Array(num);

  while (num--) {
    arr[num] = ele;
  }

  return arr;
}
