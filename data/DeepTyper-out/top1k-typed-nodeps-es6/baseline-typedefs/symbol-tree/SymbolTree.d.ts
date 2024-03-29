import TreeIterator from './TreeIterator';
declare class SymbolTree {
    constructor(description: any);
    initialize(object: any): any;
    _node(object: any): any;
    hasChildren(object: any): any;
    firstChild(object: any): any;
    lastChild(object: any): any;
    previousSibling(object: any): any;
    nextSibling(object: any): any;
    parent(object: any): any;
    lastInclusiveDescendant(object: any): any;
    preceding(object: any, options: any): any;
    following(object: any, options: any): any;
    childrenToArray(parent: any, options: any): any;
    ancestorsToArray(object: any, options: any): any;
    treeToArray(root: any, options: any): any;
    childrenIterator(parent: any, options: any): TreeIterator;
    previousSiblingsIterator(object: any): TreeIterator;
    nextSiblingsIterator(object: any): TreeIterator;
    ancestorsIterator(object: any): TreeIterator;
    treeIterator(root: any, options: any): TreeIterator;
    index(child: any): number;
    childrenCount(parent: any): number;
    compareTreePosition(left: any, right: any): number;
    remove(removeObject: any): any;
    insertBefore(referenceObject: any, newObject: any): any;
    insertAfter(referenceObject: any, newObject: any): any;
    prependChild(referenceObject: any, newObject: any): any;
    appendChild(referenceObject: any, newObject: any): any;
}
export default SymbolTree;
