export default ObjectIterator;
declare function ObjectIterator(iterable: any, start: any, stop: any, step: any): void;
declare class ObjectIterator {
    constructor(iterable: any, start: any, stop: any, step: any);
    object: any;
    keysIterator: ArrayIterator;
    next(): Iteration;
}
import ArrayIterator from "./array-iterator";
import Iteration from "./iteration";
