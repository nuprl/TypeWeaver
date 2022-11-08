export function arrayEqual(a: rray,  b: ray) {
  if (a.length !== b.length) {
    return false;
  }

  return arrayStartsWith(a, b);
}

export function arrayStartsWith(array: ArrayLike<number>,  start: number) {
  if (start.length > array.length) {
    return false;
  }

  for (let i = 0; i < start.length; i++) {
    if (start[i] !== array[i]) {
      return false;
    }
  }

  return true;
}