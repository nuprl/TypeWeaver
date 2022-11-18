"use strict";

export default Iteration;
function Iteration(value: string, done: string, index: string): Void {
    this.value = value;
    this.done = done;
    this.index = index;
}

Iteration.prototype.equals = function (other: object) {
    return (
        typeof other == 'object' &&
        other.value === this.value &&
        other.done === this.done &&
        other.index === this.index
    );
};

