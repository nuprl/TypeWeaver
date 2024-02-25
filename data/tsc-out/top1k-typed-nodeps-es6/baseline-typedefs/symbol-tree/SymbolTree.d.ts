export default SymbolTree;
declare class SymbolTree {
    constructor(description?: string);
    symbol: symbol;
    initialize(object: any): any;
    _node(object: any): any;
    hasChildren(object: any): boolean;
    firstChild(object: any): any;
    lastChild(object: any): any;
    previousSibling(object: any): any;
    nextSibling(object: any): any;
    parent(object: any): any;
    lastInclusiveDescendant(object: any): any;
    preceding(object: any, options?: {
        root?: any;
    }): any | null;
    following(object: any, options?: {
        root?: any;
        skipChildren?: boolean;
    }): any | null;
    childrenToArray(parent: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    ancestorsToArray(object: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    treeToArray(root: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    childrenIterator(parent: any, options?: {
        reverse?: boolean;
    }): any;
    previousSiblingsIterator(object: any): any;
    nextSiblingsIterator(object: any): any;
    ancestorsIterator(object: any): any;
    treeIterator(root: any, options?: {
        reverse?: boolean;
    }): any;
    index(child: any): number;
    childrenCount(parent: any): number;
    compareTreePosition(left: any, right: any): number;
    remove(removeObject: any): any;
    insertBefore(referenceObject: any, newObject: any): any;
    insertAfter(referenceObject: any, newObject: any): any;
    prependChild(referenceObject: any, newObject: any): any;
    appendChild(referenceObject: any, newObject: any): any;
}
declare namespace SymbolTree {
    export { TreePosition };
}
import TreePosition from "./TreePosition";
