'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE: string = 'Function.prototype.bind called on incompatible ';
var slice: Function = Array.prototype.slice;
var toStr: Function = Object.prototype.toString;
var funcType: string = '[object Function]';

module.exports = function bind(that: Function): object {
    var target: Function = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args: any[] = slice.call(arguments, 1);

    var bound: object;
    var binder: Function = function () {
        if (this instanceof bound) {
            var result: number = target.apply(
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
        var Empty: object = function Empty(): void {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};
