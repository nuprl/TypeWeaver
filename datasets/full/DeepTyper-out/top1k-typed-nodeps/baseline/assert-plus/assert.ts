/*
 * Copyright (c) 2018, Joyent, Inc. and assert-plus authors
 */

var assert: any = require('assert');
var Stream: any = require('stream').Stream;
var util: any = require('util');


///--- Globals

/* JSSTYLED */
var UUID_REGEXP: string = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;


///--- Internal

function _capitalize(str: string): string {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

function _toss(name: string, expected: string, oper: string, arg: any, actual: string): void {
    throw new assert.AssertionError({
        message: util.format('%s (%s) is required', name, expected),
        actual: (actual === undefined) ? typeof (arg) : actual(arg),
        expected: expected,
        operator: oper || '===',
        stackStartFunction: _toss.caller
    });
}

function _getClass(arg: any): any {
    return (Object.prototype.toString.call(arg).slice(8, -1));
}

function noop(): void {
    // Why even bother with asserts?
}


///--- Exports

var types: any = {
    bool: {
        check: function (arg: any) { return typeof (arg) === 'boolean'; }
    },
    func: {
        check: function (arg: any) { return typeof (arg) === 'function'; }
    },
    string: {
        check: function (arg: any) { return typeof (arg) === 'string'; }
    },
    object: {
        check: function (arg: any) {
            return typeof (arg) === 'object' && arg !== null;
        }
    },
    number: {
        check: function (arg: any) {
            return typeof (arg) === 'number' && !isNaN(arg);
        }
    },
    finite: {
        check: function (arg: any) {
            return typeof (arg) === 'number' && !isNaN(arg) && isFinite(arg);
        }
    },
    buffer: {
        check: function (arg: any) { return Buffer.isBuffer(arg); },
        operator: 'Buffer.isBuffer'
    },
    array: {
        check: function (arg: any) { return Array.isArray(arg); },
        operator: 'Array.isArray'
    },
    stream: {
        check: function (arg: any) { return arg instanceof Stream; },
        operator: 'instanceof',
        actual: _getClass
    },
    date: {
        check: function (arg: any) { return arg instanceof Date; },
        operator: 'instanceof',
        actual: _getClass
    },
    regexp: {
        check: function (arg: any) { return arg instanceof RegExp; },
        operator: 'instanceof',
        actual: _getClass
    },
    uuid: {
        check: function (arg: any) {
            return typeof (arg) === 'string' && UUID_REGEXP.test(arg);
        },
        operator: 'isUUID'
    }
};

function _setExports(ndebug: string): void {
    var keys: string[] = Object.keys(types);
    var out: any;

    /* re-export standard assert */
    if (process.env.NODE_NDEBUG) {
        out = noop;
    } else {
        out = function (arg: any, msg: any) {
            if (!arg) {
                _toss(msg, 'true', arg);
            }
        };
    }

    /* standard checks */
    keys.forEach(function (k: string) {
        if (ndebug) {
            out[k] = noop;
            return;
        }
        var type = types[k];
        out[k] = function (arg: any, msg: any) {
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* optional checks */
    keys.forEach(function (k: string) {
        var name: string = 'optional' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        out[name] = function (arg: any, msg: any) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* arrayOf checks */
    keys.forEach(function (k: string) {
        var name: string = 'arrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected: string = '[' + k + ']';
        out[name] = function (arg: any, msg: any) {
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i: any;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* optionalArrayOf checks */
    keys.forEach(function (k: string) {
        var name: string = 'optionalArrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected: string = '[' + k + ']';
        out[name] = function (arg: any, msg: string) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i: any;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* re-export built-in assertions */
    Object.keys(assert).forEach(function (k: string) {
        if (k === 'AssertionError') {
            out[k] = assert[k];
            return;
        }
        if (ndebug) {
            out[k] = noop;
            return;
        }
        out[k] = assert[k];
    });

    /* export ourselves (for unit tests _only_) */
    out._setExports = _setExports;

    return out;
}

module.exports = _setExports(process.env.NODE_NDEBUG);
