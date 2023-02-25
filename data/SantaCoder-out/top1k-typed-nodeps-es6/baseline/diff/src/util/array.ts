export function arrayEqual(a: any[], b: any[]) {
  if (a.length !== b.length) {
    return false;
  }

  return arrayStartsWith(a, b);
}

export function arrayStartsWith(array: number[], start: number) {
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