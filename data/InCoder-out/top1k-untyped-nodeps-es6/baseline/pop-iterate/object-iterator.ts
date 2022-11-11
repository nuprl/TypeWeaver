"use strict";

import Iteration from './iteration';
import ArrayIterator from './array-iterator';

export default ObjectIterator;
function ObjectIterator(iterable: any,  start: number,  stop: number,  step: number) {
    this.object = iterable;
    this.keysIterator = new ArrayIterator(Object.keys(iterable), start, stop, step);
}

ObjectIterator.prototype.next = function () {
    var iteration = this.keysIterator.next();
    if (iteration.done) {
        return iteration;
    }
    var key = iteration.value;
    return new Iteration(this.object[key], false, key);
};
