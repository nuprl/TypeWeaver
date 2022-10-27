'use strict';

var isCallable: Function = require('is-callable');

var toStr: Function = Object.prototype.toString;
var hasOwnProperty: Function = Object.prototype.hasOwnProperty;

var forEachArray: Function = function forEachArray(array: Array, iterator: Function, receiver: String): Void {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString: Function = function forEachString(string: String, iterator: Function, receiver: String): Void {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject: Function = function forEachObject(object: Object, iterator: Function, receiver: String): Void {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach: Boolean = function forEach(list: Object, iterator: Function, thisArg: Function): Void {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver: Function;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;
