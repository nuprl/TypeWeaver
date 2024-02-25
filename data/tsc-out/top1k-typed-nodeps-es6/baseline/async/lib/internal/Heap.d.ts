export default class Heap {
    heap: any[];
    pushCount: number;
    get length(): number;
    empty(): Heap;
    percUp(index: any): void;
    percDown(index: any): void;
    push(node: any): void;
    unshift(node: any): number;
    shift(): any;
    toArray(): any[];
    remove(testFn: any): Heap;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
