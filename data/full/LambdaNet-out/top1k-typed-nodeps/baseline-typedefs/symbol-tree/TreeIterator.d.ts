declare const TREE: any[];
declare const ROOT: string;
declare const NEXT: string;
declare const ITERATE_FUNC: number;
declare class TreeIterator {
    constructor(tree: any, root: any, firstResult: any, iterateFunction: any);
    next(): {
        done: boolean;
        value: string;
    };
}
