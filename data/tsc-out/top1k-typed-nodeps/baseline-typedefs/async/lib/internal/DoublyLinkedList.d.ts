export default class DLL {
    head: any;
    tail: any;
    length: number;
    removeLink(node: any): any;
    empty(): DLL;
    insertAfter(node: any, newNode: any): void;
    insertBefore(node: any, newNode: any): void;
    unshift(node: any): void;
    push(node: any): void;
    shift(): any;
    pop(): any;
    toArray(): any[];
    remove(testFn: any): DLL;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
