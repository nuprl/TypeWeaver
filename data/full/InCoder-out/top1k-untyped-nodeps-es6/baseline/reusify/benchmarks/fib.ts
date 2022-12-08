'use strict'

function fib (num: number) {
  var fib = []

  fib[0] = 0
  fib[1] = 1
  for (var i = 2; i <= num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1]
  }
}

export default fib;