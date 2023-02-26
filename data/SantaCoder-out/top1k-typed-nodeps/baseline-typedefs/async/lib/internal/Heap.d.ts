export default class Heap {
    constructor();
    get length(): any;
    empty(): this;
    percUp(index: any): void;
    percDown(index: any): void;
    push(node: any): void;
    unshift(node: any): any;
    shift(): any;
    toArray(): any[];
    [Symbol.iterator](): Generator<any, void, unknown>;
    remove(testFn: any): this;
}
