'use strict';

import isCallable from 'is-callable';

var toStr: string = Object.prototype.toString;
var hasOwnProperty: any = Object.prototype.hasOwnProperty;

var forEachArray: void = function forEachArray(array: any, iterator: any, receiver: any): void {
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

var forEachString: void = function forEachString(string, iterator: any, receiver: any): void {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject: void = function forEachObject(object: any, iterator: any, receiver: any): void {
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

var forEach: void = function forEach(list: any, iterator: any, thisArg: any): void {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver: any;
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

export default forEach;
