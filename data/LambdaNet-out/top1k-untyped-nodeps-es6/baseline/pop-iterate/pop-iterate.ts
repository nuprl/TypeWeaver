"use strict";

import ArrayIterator from './array-iterator';
import ObjectIterator from './object-iterator';

export default iterate;
function iterate(iterable: Function, start: string, stop: Function, step: string): string {
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

