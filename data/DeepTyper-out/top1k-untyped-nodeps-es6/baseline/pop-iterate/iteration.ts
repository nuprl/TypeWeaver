"use strict";

export default Iteration;
function Iteration(value: any, done: any, index: number): void {
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

