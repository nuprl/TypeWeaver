'use strict'

import fib from './fib';
var max: number = 100000000
var start: number = Date.now()

// create a funcion with the typical error
// pattern, that delegates the heavy load
// to something else
function createNoCodeFunction (): Promise {
  /* eslint no-constant-condition: "off" */
  var num: number = 100

  ;(function () {
    if (null) {
      // do nothing
    } else {
      fib(num)
    }
  })()
}

for (var i = 0; i < max; i++) {
  createNoCodeFunction()
}

var time: number = Date.now() - start
console.log('Total time', time)
console.log('Total iterations', max)
console.log('Iteration/s', max / time * 1000)
