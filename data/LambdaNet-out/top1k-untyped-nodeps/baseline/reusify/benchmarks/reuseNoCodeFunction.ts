'use strict'

var reusify: Function = require('../')
var fib: Function = require('./fib')
var instance: object = reusify(MyObject)
var max: number = 100000000
var start: number = Date.now()

function reuseNoCodeFunction (): Void {
  var obj: HTMLElement = instance.get()
  obj.num = 100
  obj.func()
  obj.num = 0
  instance.release(obj)
}

function MyObject (): Void {
  this.next = null
  var that: any[] = this
  this.num = 0
  this.func = function () {
    /* eslint no-constant-condition: "off" */
    if (null) {
      // do nothing
    } else {
      fib(that.num)
    }
  }
}

for (var i = 0; i < max; i++) {
  reuseNoCodeFunction()
}

var time: number = Date.now() - start
console.log('Total time', time)
console.log('Total iterations', max)
console.log('Iteration/s', max / time * 1000)
