/*
 * @fileoverview Utilities for Doctrine
 * @author Yusuke Suzuki <utatane.tea@gmail.com>
 */


(function () {
    'use strict';

    var VERSION: number;

    VERSION = require('../package.json').version;
    exports.VERSION = VERSION;

    function DoctrineError(message: string): Void {
        this.name = 'DoctrineError';
        this.message = message;
    }
    DoctrineError.prototype = (function () {
        var Middle: Function = function () { };
        Middle.prototype = Error.prototype;
        return new Middle();
    }());
    DoctrineError.prototype.constructor = DoctrineError;
    exports.DoctrineError = DoctrineError;

    function throwError(message: string): Void {
        throw new DoctrineError(message);
    }
    exports.throwError = throwError;

    exports.assert = require('assert');
}());

/* vim: set sw=4 ts=4 et tw=80 : */
