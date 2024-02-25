export = SymbolTree;
declare class SymbolTree {
    /**
     * @constructor
     * @alias module:symbol-tree
     * @param {string} [description='SymbolTree data'] Description used for the Symbol
     */
    constructor(description?: string);
    symbol: symbol;
    /**
     * You can use this function to (optionally) initialize an object right after its creation,
     * to take advantage of V8's fast properties. Also useful if you would like to
     * freeze your object.
     *
     * * `O(1)`
     *
     * @method
     * @alias module:symbol-tree#initialize
     * @param {Object} object
     * @return {Object} object
     */
    initialize(object: any): any;
    _node(object: any): any;
    /**
     * Returns `true` if the object has any children. Otherwise it returns `false`.
     *
     * * `O(1)`
     *
     * @method hasChildren
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Boolean}
     */
    hasChildren(object: any): boolean;
    /**
     * Returns the first child of the given object.
     *
     * * `O(1)`
     *
     * @method firstChild
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    firstChild(object: any): any;
    /**
     * Returns the last child of the given object.
     *
     * * `O(1)`
     *
     * @method lastChild
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    lastChild(object: any): any;
    /**
     * Returns the previous sibling of the given object.
     *
     * * `O(1)`
     *
     * @method previousSibling
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    previousSibling(object: any): any;
    /**
     * Returns the next sibling of the given object.
     *
     * * `O(1)`
     *
     * @method nextSibling
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    nextSibling(object: any): any;
    /**
     * Return the parent of the given object.
     *
     * * `O(1)`
     *
     * @method parent
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    parent(object: any): any;
    /**
     * Find the inclusive descendant that is last in tree order of the given object.
     *
     * * `O(n)` (worst case) where `n` is the depth of the subtree of `object`
     *
     * @method lastInclusiveDescendant
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object}
     */
    lastInclusiveDescendant(object: any): any;
    /**
     * Find the preceding object (A) of the given object (B).
     * An object A is preceding an object B if A and B are in the same tree
     * and A comes before B in tree order.
     *
     * * `O(n)` (worst case)
     * * `O(1)` (amortized when walking the entire tree)
     *
     * @method preceding
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @param {Object} [options]
     * @param {Object} [options.root] If set, `root` must be an inclusive ancestor
     *        of the return value (or else null is returned). This check _assumes_
     *        that `root` is also an inclusive ancestor of the given `object`
     * @return {?Object}
     */
    preceding(object: any, options?: {
        root?: any;
    }): any | null;
    /**
     * Find the following object (A) of the given object (B).
     * An object A is following an object B if A and B are in the same tree
     * and A comes after B in tree order.
     *
     * * `O(n)` (worst case) where `n` is the amount of objects in the entire tree
     * * `O(1)` (amortized when walking the entire tree)
     *
     * @method following
     * @memberOf module:symbol-tree#
     * @param {!Object} object
     * @param {Object} [options]
     * @param {Object} [options.root] If set, `root` must be an inclusive ancestor
     *        of the return value (or else null is returned). This check _assumes_
     *        that `root` is also an inclusive ancestor of the given `object`
     * @param {Boolean} [options.skipChildren=false] If set, ignore the children of `object`
     * @return {?Object}
     */
    following(object: any, options?: {
        root?: any;
        skipChildren?: boolean;
    }): any | null;
    /**
     * Append all children of the given object to an array.
     *
     * * `O(n)` where `n` is the amount of children of the given `parent`
     *
     * @method childrenToArray
     * @memberOf module:symbol-tree#
     * @param {Object} parent
     * @param {Object} [options]
     * @param {Object[]} [options.array=[]]
     * @param {Function} [options.filter] Function to test each object before it is added to the array.
     *                            Invoked with arguments (object). Should return `true` if an object
     *                            is to be included.
     * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
     * @return {Object[]}
     */
    childrenToArray(parent: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    /**
     * Append all inclusive ancestors of the given object to an array.
     *
     * * `O(n)` where `n` is the amount of ancestors of the given `object`
     *
     * @method ancestorsToArray
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @param {Object} [options]
     * @param {Object[]} [options.array=[]]
     * @param {Function} [options.filter] Function to test each object before it is added to the array.
     *                            Invoked with arguments (object). Should return `true` if an object
     *                            is to be included.
     * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
     * @return {Object[]}
     */
    ancestorsToArray(object: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    /**
     * Append all descendants of the given object to an array (in tree order).
     *
     * * `O(n)` where `n` is the amount of objects in the sub-tree of the given `object`
     *
     * @method treeToArray
     * @memberOf module:symbol-tree#
     * @param {Object} root
     * @param {Object} [options]
     * @param {Object[]} [options.array=[]]
     * @param {Function} [options.filter] Function to test each object before it is added to the array.
     *                            Invoked with arguments (object). Should return `true` if an object
     *                            is to be included.
     * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
     * @return {Object[]}
     */
    treeToArray(root: any, options?: {
        array?: any[];
        filter?: Function;
        thisArg?: any;
    }): any[];
    /**
     * Iterate over all children of the given object
     *
     * * `O(1)` for a single iteration
     *
     * @method childrenIterator
     * @memberOf module:symbol-tree#
     * @param {Object} parent
     * @param {Object} [options]
     * @param {Boolean} [options.reverse=false]
     * @return {Object} An iterable iterator (ES6)
     */
    childrenIterator(parent: any, options?: {
        reverse?: boolean;
    }): any;
    /**
     * Iterate over all the previous siblings of the given object. (in reverse tree order)
     *
     * * `O(1)` for a single iteration
     *
     * @method previousSiblingsIterator
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object} An iterable iterator (ES6)
     */
    previousSiblingsIterator(object: any): any;
    /**
     * Iterate over all the next siblings of the given object. (in tree order)
     *
     * * `O(1)` for a single iteration
     *
     * @method nextSiblingsIterator
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object} An iterable iterator (ES6)
     */
    nextSiblingsIterator(object: any): any;
    /**
     * Iterate over all inclusive ancestors of the given object
     *
     * * `O(1)` for a single iteration
     *
     * @method ancestorsIterator
     * @memberOf module:symbol-tree#
     * @param {Object} object
     * @return {Object} An iterable iterator (ES6)
     */
    ancestorsIterator(object: any): any;
    /**
     * Iterate over all descendants of the given object (in tree order).
     *
     * Where `n` is the amount of objects in the sub-tree of the given `root`:
     *
     * * `O(n)` (worst case for a single iteration)
     * * `O(n)` (amortized, when completing the iterator)
     *
     * @method treeIterator
     * @memberOf module:symbol-tree#
     * @param {Object} root
     * @param {Object} [options]
     * @param {Boolean} [options.reverse=false]
     * @return {Object} An iterable iterator (ES6)
     */
    treeIterator(root: any, options?: {
        reverse?: boolean;
    }): any;
    /**
     * Find the index of the given object (the number of preceding siblings).
     *
     * * `O(n)` where `n` is the amount of preceding siblings
     * * `O(1)` (amortized, if the tree is not modified)
     *
     * @method index
     * @memberOf module:symbol-tree#
     * @param {Object} child
     * @return {Number} The number of preceding siblings, or -1 if the object has no parent
     */
    index(child: any): number;
    /**
     * Calculate the number of children.
     *
     * * `O(n)` where `n` is the amount of children
     * * `O(1)` (amortized, if the tree is not modified)
     *
     * @method childrenCount
     * @memberOf module:symbol-tree#
     * @param {Object} parent
     * @return {Number}
     */
    childrenCount(parent: any): number;
    /**
     * Compare the position of an object relative to another object. A bit set is returned:
     *
     * <ul>
     *     <li>DISCONNECTED : 1</li>
     *     <li>PRECEDING : 2</li>
     *     <li>FOLLOWING : 4</li>
     *     <li>CONTAINS : 8</li>
     *     <li>CONTAINED_BY : 16</li>
     * </ul>
     *
     * The semantics are the same as compareDocumentPosition in DOM, with the exception that
     * DISCONNECTED never occurs with any other bit.
     *
     * where `n` and `m` are the amount of ancestors of `left` and `right`;
     * where `o` is the amount of children of the lowest common ancestor of `left` and `right`:
     *
     * * `O(n + m + o)` (worst case)
     * * `O(n + m)` (amortized, if the tree is not modified)
     *
     * @method compareTreePosition
     * @memberOf module:symbol-tree#
     * @param {Object} left
     * @param {Object} right
     * @return {Number}
     */
    compareTreePosition(left: any, right: any): number;
    /**
     * Remove the object from this tree.
     * Has no effect if already removed.
     *
     * * `O(1)`
     *
     * @method remove
     * @memberOf module:symbol-tree#
     * @param {Object} removeObject
     * @return {Object} removeObject
     */
    remove(removeObject: any): any;
    /**
     * Insert the given object before the reference object.
     * `newObject` is now the previous sibling of `referenceObject`.
     *
     * * `O(1)`
     *
     * @method insertBefore
     * @memberOf module:symbol-tree#
     * @param {Object} referenceObject
     * @param {Object} newObject
     * @throws {Error} If the newObject is already present in this SymbolTree
     * @return {Object} newObject
     */
    insertBefore(referenceObject: any, newObject: any): any;
    /**
     * Insert the given object after the reference object.
     * `newObject` is now the next sibling of `referenceObject`.
     *
     * * `O(1)`
     *
     * @method insertAfter
     * @memberOf module:symbol-tree#
     * @param {Object} referenceObject
     * @param {Object} newObject
     * @throws {Error} If the newObject is already present in this SymbolTree
     * @return {Object} newObject
     */
    insertAfter(referenceObject: any, newObject: any): any;
    /**
     * Insert the given object as the first child of the given reference object.
     * `newObject` is now the first child of `referenceObject`.
     *
     * * `O(1)`
     *
     * @method prependChild
     * @memberOf module:symbol-tree#
     * @param {Object} referenceObject
     * @param {Object} newObject
     * @throws {Error} If the newObject is already present in this SymbolTree
     * @return {Object} newObject
     */
    prependChild(referenceObject: any, newObject: any): any;
    /**
     * Insert the given object as the last child of the given reference object.
     * `newObject` is now the last child of `referenceObject`.
     *
     * * `O(1)`
     *
     * @method appendChild
     * @memberOf module:symbol-tree#
     * @param {Object} referenceObject
     * @param {Object} newObject
     * @throws {Error} If the newObject is already present in this SymbolTree
     * @return {Object} newObject
     */
    appendChild(referenceObject: any, newObject: any): any;
}
declare namespace SymbolTree {
    export { TreePosition };
}
import TreePosition = require("./TreePosition");
