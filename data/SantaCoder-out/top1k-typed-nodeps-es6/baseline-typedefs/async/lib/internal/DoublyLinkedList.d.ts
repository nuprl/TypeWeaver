export default class DLL {
    constructor();
    removeLink(node: any): any;
    empty(): this;
    insertAfter(node: any, newNode: any): void;
    insertBefore(node: any, newNode: any): void;
    unshift(node: any): void;
    push(node: any): void;
    shift(): any;
    pop(): any;
    toArray(): any[];
    [Symbol.iterator](): Generator<any, void, unknown>;
    remove(testFn: any): this;
}
