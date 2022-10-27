"use strict";

module.exports = Iteration;
function Iteration(value: String, done: Number, index: Number): Void {
    this.value = value;
    this.done = done;
    this.index = index;
}

Iteration.prototype.equals = function (other: Object) {
    return (
        typeof other == 'object' &&
        other.value === this.value &&
        other.done === this.done &&
        other.index === this.index
    );
};

