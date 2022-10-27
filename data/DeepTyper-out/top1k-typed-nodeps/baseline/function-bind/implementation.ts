'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE: string = 'Function.prototype.bind called on incompatible ';
var slice: any[] = Array.prototype.slice;
var toStr: string = Object.prototype.toString;
var funcType: string = '[object Function]';

module.exports = function bind(that: any): any {
    var target: any = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args: any[] = slice.call(arguments, 1);

    var bound: any;
    var binder: void = function () {
        if (this instanceof bound) {
            var result: any = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            args.concat(slice.call(arguments))
        );

    };

    var boundLength: number = Math.max(0, target.length - args.length);
    var boundArgs: any[] = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty: void = function Empty(): void {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};
