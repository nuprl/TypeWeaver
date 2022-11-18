"use strict";

var ArrayIterator: any[] = require("./array-iterator");
var ObjectIterator: any[] = require("./object-iterator");

module.exports = iterate;
function iterate(iterable: Function, start: string, stop: Function, step: string): any[] {
    if (!iterable) {
        return empty;
    } else if (Array.isArray(iterable)) {
        return new ArrayIterator(iterable, start, stop, step);
    } else if (typeof iterable.next === "function") {
        return iterable;
    } else if (typeof iterable.iterate === "function") {
        return iterable.iterate(start, stop, step);
    } else if (typeof iterable === "object") {
        return new ObjectIterator(iterable);
    } else {
        throw new TypeError("Can't iterate " + iterable);
    }
}

