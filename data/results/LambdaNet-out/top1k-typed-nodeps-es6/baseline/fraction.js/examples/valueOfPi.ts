import Fraction from 'fraction.js';

function valueOfPi(val: number): string {

  let minLen: number = Infinity, minI: number = 0, min: HTMLElement = null;
  const choose: any[] = [val, val * Math.PI, val / Math.PI];
  for (let i = 0; i < choose.length; i++) {
    let el: HTMLElement = new Fraction(choose[i]).simplify(1e-13);
    let len: number = Math.log(el.n + 1) + Math.log(el.d);
    if (len < minLen) {
      minLen = len;
      minI = i;
      min = el;
    }
  }

  if (minI == 2) {
    return min.toFraction().replace(/(\d+)(\/\d+)?/, (_: string, p: string, q: string) => 
      (p == "1" ? "" : p) + "π" + (q || ""));
  }

  if (minI == 1) {
    return min.toFraction().replace(/(\d+)(\/\d+)?/, (_: string, p: number, q: string) => 
      p + (!q ? "/π" : "/(" + q.slice(1) + "π)"));
  }
  return min.toFraction();
}

console.log(valueOfPi(-3)); // -3
console.log(valueOfPi(4 * Math.PI)); // 4π
console.log(valueOfPi(3.14)); // 157/50
console.log(valueOfPi(3/2*Math.PI)); // 3π/2
console.log(valueOfPi(Math.PI/2)); // π/2
console.log(valueOfPi(-1/(2*Math.PI))); // -1/(2π)

