'use strict'

function fib (num: Number): Void {
  var fib: Promise = []

  fib[0] = 0
  fib[1] = 1
  for (var i = 2; i <= num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1]
  }
}

export default fib;
