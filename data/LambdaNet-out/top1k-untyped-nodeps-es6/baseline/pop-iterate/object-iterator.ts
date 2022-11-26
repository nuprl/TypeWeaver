"use strict";

import Iteration from './iteration';
import ArrayIterator from './array-iterator';

export default ObjectIterator;
function ObjectIterator(iterable: Function, start: string, stop: Function, step: string): void {
    this.object = iterable;
    this.keysIterator = new ArrayIterator(Object.keys(iterable), start, stop, step);
}

ObjectIterator.prototype.next = function () {
    var iteration: object = this.keysIterator.next();
    if (iteration.done) {
        return iteration;
    }
    var key: string = iteration.value;
    return new Iteration(this.object[key], false, key);
};

