declare class TreeIterator {
    constructor(tree: any, root: any, firstResult: any, iterateFunction: any);
    next(): {
        done: boolean;
        value: any;
    };
}
export default TreeIterator;
