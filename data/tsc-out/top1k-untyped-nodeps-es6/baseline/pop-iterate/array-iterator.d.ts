export default ArrayIterator;
declare function ArrayIterator(iterable: any, start: any, stop: any, step: any): void;
declare class ArrayIterator {
    constructor(iterable: any, start: any, stop: any, step: any);
    array: any;
    start: any;
    stop: any;
    step: any;
    next(): Iteration;
}
import Iteration from "./iteration";
