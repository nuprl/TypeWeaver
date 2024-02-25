export default TreeIterator;
declare class TreeIterator {
    constructor(tree: any, root: any, firstResult: any, iterateFunction: any);
    next(): {
        done: boolean;
        value: any;
    };
    [TREE]: any;
    [ROOT]: any;
    [NEXT]: any;
    [ITERATE_FUNC]: any;
}
declare namespace TreeIterator {
    export const PREV: number;
    const NEXT_1: number;
    export { NEXT_1 as NEXT };
    export const PARENT: number;
    export const PRECEDING: number;
    export const FOLLOWING: number;
}
declare const TREE: unique symbol;
declare const ROOT: unique symbol;
declare const NEXT: unique symbol;
declare const ITERATE_FUNC: unique symbol;
