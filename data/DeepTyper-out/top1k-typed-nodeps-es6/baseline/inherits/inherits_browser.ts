/* istanbul ignore else - coverage doesn't work without Object.create */
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  export default function inherits(ctor: Function, superCtor: any): void {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  export default function inherits(ctor: Function, superCtor: any): void {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor: void = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  };
}
