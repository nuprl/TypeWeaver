export default function (arr: String) {
  return flatten(arr, []);
};

function flatten(arr: Array, res: Array): Array {
  var len: Number = arr.length;
  var num: Number = 0;

  while (len--) {
    var i: Number = num++;

    if (Array.isArray(arr[i])) {
      flatten(arr[i], res);
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
