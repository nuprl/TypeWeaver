declare const TREE: symbol;
declare const ROOT: symbol;
declare const NEXT: symbol;
declare const ITERATE_FUNC: symbol;
declare class TreeIterator {
    constructor(tree: any, root: any, firstResult: any, iterateFunction: any);
    next(): {
        done: boolean;
        value: any;
    };
}
