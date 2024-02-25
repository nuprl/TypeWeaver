declare function _exports(size: any): LruCache;
export = _exports;
declare function LruCache(size: any): void;
declare class LruCache {
    constructor(size: any);
    capacity: number;
    map: any;
    list: DoublyLinkedList;
    get(key: any): any;
    set(key: any, val: any): boolean;
    used(node: any): void;
    prune(): void;
}
declare function DoublyLinkedList(): void;
declare class DoublyLinkedList {
    firstNode: any;
    lastNode: any;
    moveToFront(node: any): void;
    pop(): any;
    remove(node: any): void;
}
