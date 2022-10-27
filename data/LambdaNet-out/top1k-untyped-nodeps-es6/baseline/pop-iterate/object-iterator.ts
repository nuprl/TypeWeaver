"use strict";

import Iteration from './iteration';
import ArrayIterator from './array-iterator';

export default ObjectIterator;
function ObjectIterator(iterable: Function, start: String, stop: Function, step: String): Void {
    this.object = iterable;
    this.keysIterator = new ArrayIterator(Object.keys(iterable), start, stop, step);
}

ObjectIterator.prototype.next = function () {
    var iteration: Object = this.keysIterator.next();
    if (iteration.done) {
        return iteration;
    }
    var key: String = iteration.value;
    return new Iteration(this.object[key], false, key);
};

