'use strict';

function throatInternal(size: number): void {
  var queue: any = new Queue();
  var s: number = size | 0;

  function run(fn: Function, self: any, args: any): Promise<{}> {
    if ((s | 0) !== 0) {
      s = (s | 0) - 1;
      return new Promise(function (resolve: void) {
        resolve(fn.apply(self, args));
      }).then(onFulfill, onReject);
    }
    return new Promise(function (resolve: void) {
      queue.push(new Delayed(resolve, fn, self, args));
    }).then(runDelayed);
  }
  function runDelayed(d: any): Promise<{}> {
    try {
      return Promise.resolve(d.fn.apply(d.self, d.args)).then(
        onFulfill,
        onReject
      );
    } catch (ex) {
      onReject(ex);
    }
  }
  function onFulfill(result: any): void {
    release();
    return result;
  }
  function onReject(error: Error): void {
    release();
    throw error;
  }
  function release(): void {
    var next: any = queue.shift();
    if (next) {
      next.resolve(next);
    } else {
      s = (s | 0) + 1;
    }
  }

  return run;
}

function earlyBound(size: number, fn: any): any {
  const run: any = throatInternal(size | 0);
  return function () {
    var args: any[] = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return run(fn, this, args);
  };
}
function lateBound(size: number): void {
  const run: any = throatInternal(size | 0);
  return function (fn: any) {
    if (typeof fn !== 'function') {
      throw new TypeError(
        'Expected throat fn to be a function but got ' + typeof fn
      );
    }
    var args: any[] = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    return run(fn, this, args);
  };
}
module.exports = function throat(size: number, fn: any): any {
  if (typeof size === 'function') {
    var temp: any = fn;
    fn = size;
    size = temp;
  }
  if (typeof size !== 'number') {
    throw new TypeError(
      'Expected throat size to be a number but got ' + typeof size
    );
  }
  if (fn !== undefined && typeof fn !== 'function') {
    throw new TypeError(
      'Expected throat fn to be a function but got ' + typeof fn
    );
  }
  if (typeof fn === 'function') {
    return earlyBound(size | 0, fn);
  } else {
    return lateBound(size | 0);
  }
};

module.exports.default = module.exports;

function Delayed(resolve: any, fn: Function, self: any, args: any): void {
  this.resolve = resolve;
  this.fn = fn;
  this.self = self || null;
  this.args = args;
}

var blockSize: number = 64;
function Queue(): any {
  this._s1 = [];
  this._s2 = [];
  this._shiftBlock = this._pushBlock = new Array(blockSize);
  this._pushIndex = 0;
  this._shiftIndex = 0;
}

Queue.prototype.push = function (value: number) {
  if (this._pushIndex === blockSize) {
    this._pushIndex = 0;
    this._s1[this._s1.length] = this._pushBlock = new Array(blockSize);
  }
  this._pushBlock[this._pushIndex++] = value;
};

Queue.prototype.shift = function () {
  if (this._shiftIndex === blockSize) {
    this._shiftIndex = 0;
    var s2: number = this._s2;
    if (s2.length === 0) {
      var s1: any = this._s1;
      if (s1.length === 0) {
        return undefined;
      }
      this._s1 = s2;
      s2 = this._s2 = s1.reverse();
    }
    this._shiftBlock = s2.pop();
  }
  if (
    this._pushBlock === this._shiftBlock &&
    this._pushIndex === this._shiftIndex
  ) {
    return undefined;
  }
  var result: any = this._shiftBlock[this._shiftIndex];
  this._shiftBlock[this._shiftIndex++] = null;
  return result;
};
