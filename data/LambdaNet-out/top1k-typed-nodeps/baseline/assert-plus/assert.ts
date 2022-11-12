/*
 * Copyright (c) 2018, Joyent, Inc. and assert-plus authors
 */

var assert: String = require('assert');
var Stream: Number = require('stream').Stream;
var util: String = require('util');


///--- Globals

/* JSSTYLED */
var UUID_REGEXP: RegExp = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;


///--- Internal

function _capitalize(str: String): String {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

function _toss(name: String, expected: String, oper: Number, arg: String, actual: Function): Void {
    throw new assert.AssertionError({
        message: util.format('%s (%s) is required', name, expected),
        actual: (actual === undefined) ? typeof (arg) : actual(arg),
        expected: expected,
        operator: oper || '===',
        stackStartFunction: _toss.caller
    });
}

function _getClass(arg: String): String {
    return (Object.prototype.toString.call(arg).slice(8, -1));
}

function noop(): Void {
    // Why even bother with asserts?
}


///--- Exports

var types: Object = {
    bool: {
        check: function (arg: String) { return typeof (arg) === 'boolean'; }
    },
    func: {
        check: function (arg: String) { return typeof (arg) === 'function'; }
    },
    string: {
        check: function (arg: String) { return typeof (arg) === 'string'; }
    },
    object: {
        check: function (arg: String) {
            return typeof (arg) === 'object' && arg !== null;
        }
    },
    number: {
        check: function (arg: Number) {
            return typeof (arg) === 'number' && !isNaN(arg);
        }
    },
    finite: {
        check: function (arg: String) {
            return typeof (arg) === 'number' && !isNaN(arg) && isFinite(arg);
        }
    },
    buffer: {
        check: function (arg: String) { return Buffer.isBuffer(arg); },
        operator: 'Buffer.isBuffer'
    },
    array: {
        check: function (arg: Array) { return Array.isArray(arg); },
        operator: 'Array.isArray'
    },
    stream: {
        check: function (arg: String) { return arg instanceof Stream; },
        operator: 'instanceof',
        actual: _getClass
    },
    date: {
        check: function (arg: String) { return arg instanceof Date; },
        operator: 'instanceof',
        actual: _getClass
    },
    regexp: {
        check: function (arg: String) { return arg instanceof RegExp; },
        operator: 'instanceof',
        actual: _getClass
    },
    uuid: {
        check: function (arg: String) {
            return typeof (arg) === 'string' && UUID_REGEXP.test(arg);
        },
        operator: 'isUUID'
    }
};

function _setExports(ndebug: Boolean): Object {
    var keys: Array = Object.keys(types);
    var out: Object;

    /* re-export standard assert */
    if (process.env.NODE_NDEBUG) {
        out = noop;
    } else {
        out = function (arg: Boolean, msg: String) {
            if (!arg) {
                _toss(msg, 'true', arg);
            }
        };
    }

    /* standard checks */
    keys.forEach(function (k: String) {
        if (ndebug) {
            out[k] = noop;
            return;
        }
        var type: Object = types[k];
        out[k] = function (arg: String, msg: String) {
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* optional checks */
    keys.forEach(function (k: String) {
        var name: String = 'optional' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type: Object = types[k];
        out[name] = function (arg: String, msg: String) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* arrayOf checks */
    keys.forEach(function (k: String) {
        var name: String = 'arrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type: Object = types[k];
        var expected: String = '[' + k + ']';
        out[name] = function (arg: Array, msg: String) {
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i: Number;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* optionalArrayOf checks */
    keys.forEach(function (k: String) {
        var name: String = 'optionalArrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type: Object = types[k];
        var expected: String = '[' + k + ']';
        out[name] = function (arg: Array, msg: String) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i: Number;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* re-export built-in assertions */
    Object.keys(assert).forEach(function (k: String) {
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
