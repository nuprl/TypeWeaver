export function arrayEqual(a: ny[],  b: y[]) {
  if (a.length !== b.length) {
    return false;
  }

  return arrayStartsWith(a, b);
}

export function arrayStartsWith(array: ArrayLike<any>,  start: number) {
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