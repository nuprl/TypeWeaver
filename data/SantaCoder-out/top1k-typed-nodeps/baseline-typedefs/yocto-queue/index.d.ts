export default class Queue {
    #private;
    constructor();
    enqueue(value: any): void;
    dequeue(): any;
    clear(): void;
    get size(): any;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
