export default class Container extends Node {
    constructor(opts: any);
    nodes: any[];
    append(selector: any): Container;
    prepend(selector: any): Container;
    at(index: any): any;
    index(child: any): number;
    get first(): any;
    get last(): any;
    get length(): number;
    removeChild(child: any): Container;
    removeAll(): Container;
    empty(): Container;
    insertAfter(oldNode: any, newNode: any): Container;
    insertBefore(oldNode: any, newNode: any): Container;
    _findChildAtPosition(line: any, col: any): any;
    /**
     * Return the most specific node at the line and column number given.
     * The source location is based on the original parsed location, locations aren't
     * updated as selector nodes are mutated.
     *
     * Note that this location is relative to the location of the first character
     * of the selector, and not the location of the selector in the overall document
     * when used in conjunction with postcss.
     *
     * If not found, returns undefined.
     * @param {number} line The line number of the node to find. (1-based index)
     * @param {number} col  The column number of the node to find. (1-based index)
     */
    atPosition(line: number, col: number): any;
    _inferEndPosition(): void;
    source: any;
    each(callback: any): boolean;
    lastEach: number;
    indexes: {};
    walk(callback: any): boolean;
    walkAttributes(callback: any): boolean;
    walkClasses(callback: any): boolean;
    walkCombinators(callback: any): boolean;
    walkComments(callback: any): boolean;
    walkIds(callback: any): boolean;
    walkNesting(callback: any): boolean;
    walkPseudos(callback: any): boolean;
    walkTags(callback: any): boolean;
    walkUniversals(callback: any): boolean;
    split(callback: any): any;
    map(callback: any): any[];
    reduce(callback: any, memo: any): any;
    every(callback: any): boolean;
    some(callback: any): boolean;
    filter(callback: any): any[];
    sort(callback: any): any[];
}
import Node from "./node";
