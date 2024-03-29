export default function (arr: Array<any>) {
  return flatten(arr, []);
};

function flatten(arr: number[],  res: number[]) {
  var len = arr.length;
  var num = 0;

  while (len--) {
    var i = num++;

    if (Array.isArray(arr[i])) {
      flatten(arr[i], res);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}