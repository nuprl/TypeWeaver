"use strict";

import Iteration from './iteration';

export default ArrayIterator;
function ArrayIterator(iterable: Function, start: Number, stop: String, step: Number): Void {
    this.array = iterable;
    this.start = start || 0;
    this.stop = stop || Infinity;
    this.step = step || 1;
}

ArrayIterator.prototype.next = function () {
    var iteration: Object;
    if (this.start < Math.min(this.array.length, this.stop)) {
        iteration = new Iteration(this.array[this.start], false, this.start);
        this.start += this.step;
    } else {
        iteration =  new Iteration(undefined, true);
    }
    return iteration;
};

