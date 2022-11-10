"use strict";

module.exports = Iteration;
function Iteration(value: any,  done: Function,  index: number) {
    this.value = value;
    this.done = done;
    this.index = index;
}

Iteration.prototype.equals = function (other: any) {
    return (
        typeof other == 'object' &&
        other.value === this.value &&
        other.done === this.done &&
        other.index === this.index
    );
};