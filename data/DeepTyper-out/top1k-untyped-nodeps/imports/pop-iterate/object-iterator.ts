"use strict";

import Iteration from "./iteration";
import ArrayIterator from "./array-iterator";

module.exports = ObjectIterator;
function ObjectIterator(iterable: any, start: number, stop: number, step: number): void {
    this.object = iterable;
    this.keysIterator = new ArrayIterator(Object.keys(iterable), start, stop, step);
}

ObjectIterator.prototype.next = function () {
    var iteration: any = this.keysIterator.next();
    if (iteration.done) {
        return iteration;
    }
    var key: any = iteration.value;
    return new Iteration(this.object[key], false, key);
};

