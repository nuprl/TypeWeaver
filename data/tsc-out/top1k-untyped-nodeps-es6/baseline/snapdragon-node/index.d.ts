export default Node;
/**
 * Create a new AST `Node` with the given `type` and `value`, or an
 * object to initialize with.
 *
 * ```js
 * console.log(new Node({ type: 'star', value: '*' }));
 * console.log(new Node('star', '*'));
 * // both result in => Node { type: 'star', value: '*' }
 * ```
 * @name Node
 * @param {object|string} `type` Either an object to initialize with, or a string to be used as the `node.type`.
 * @param {string|boolean} `value` If the first argument is a string, the second argument may be a string value to set on `node.value`.
 * @param {boolean} `clone` When an object is passed as the first argument, pass true as the last argument to deep clone values before assigning them to the new node.
 * @return {Object} node instance
 * @api public
 */
declare class Node {
    /**
     * Static method that returns true if the given value is a node.
     *
     * ```js
     * const Node = require('snapdragon-node');
     * const node = new Node({type: 'foo'});
     * console.log(Node.isNode(node)); //=> true
     * console.log(Node.isNode({})); //=> false
     * ```
     * @name Node#isNode
     * @param {Object} `node`
     * @returns {Boolean}
     * @api public
     * @static
     */
    static isNode(node: any): boolean;
    constructor(type: any, value: any, clone: any);
    type: any;
    value: any;
    /**
     * Return a clone of the node. Values that are arrays or plain objects
     * are deeply cloned.
     *
     * ```js
     * const node = new Node({type: 'star', value: '*'});
     * consle.log(node.clone() !== node);
     * //=> true
     * ```
     * @name .clone
     * @return {Object} returns a clone of the node
     * @api public
     */
    clone(): any;
    /**
     * Return a string created from `node.value` and/or recursively
     * visiting over `node.nodes`.
     *
     * ```js
     * const node = new Node({type: 'star', value: '*'});
     * consle.log(node.stringify());
     * //=> '*'
     * ```
     * @name .stringify
     * @return {String}
     * @api public
     */
    stringify(fn?: (n: any) => any): string;
    /**
     * Push a child node onto the `node.nodes` array.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * foo.push(bar);
     * ```
     * @name .push
     * @param {Object} `node`
     * @return {Number} Returns the length of `node.nodes`, like `Array.push`
     * @api public
     */
    push(node: any): number;
    nodes: any;
    /**
     * Unshift a child node onto `node.nodes`, and set `node` as
     * the parent on `child.parent`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * foo.unshift(bar);
     * ```
     * @name .unshift
     * @param {Object} `node`
     * @return {Number} Returns the length of `node.nodes`
     * @api public
     */
    unshift(node: any): number;
    /**
     * Pop a node from `node.nodes`.
     *
     * ```js
     * const node = new Node({type: 'foo'});
     * node.push(new Node({type: 'a'}));
     * node.push(new Node({type: 'b'}));
     * node.push(new Node({type: 'c'}));
     * node.push(new Node({type: 'd'}));
     * console.log(node.nodes.length);
     * //=> 4
     * node.pop();
     * console.log(node.nodes.length);
     * //=> 3
     * ```
     * @name .pop
     * @return {Number} Returns the popped `node`
     * @api public
     */
    pop(): number;
    /**
     * Shift a node from `node.nodes`.
     *
     * ```js
     * const node = new Node({type: 'foo'});
     * node.push(new Node({type: 'a'}));
     * node.push(new Node({type: 'b'}));
     * node.push(new Node({type: 'c'}));
     * node.push(new Node({type: 'd'}));
     * console.log(node.nodes.length);
     * //=> 4
     * node.shift();
     * console.log(node.nodes.length);
     * //=> 3
     * ```
     * @name .shift
     * @return {Object} Returns the shifted `node`
     * @api public
     */
    shift(): any;
    /**
     * Remove `node` from `node.nodes`.
     *
     * ```js
     * node.remove(childNode);
     * ```
     * @name .remove
     * @param {Object} `node`
     * @return {Object} Returns the removed node.
     * @api public
     */
    remove(node: any): any;
    /**
     * Get the first child node from `node.nodes` that matches the given `type`.
     * If `type` is a number, the child node at that index is returned.
     *
     * ```js
     * const child = node.find(1); //<= index of the node to get
     * const child = node.find('foo'); //<= node.type of a child node
     * const child = node.find(/^(foo|bar)$/); //<= regex to match node.type
     * const child = node.find(['foo', 'bar']); //<= array of node.type(s)
     * ```
     * @name .find
     * @param {String} `type`
     * @return {Object} Returns a child node or undefined.
     * @api public
     */
    find(type: string, n?: number): any;
    visit(fn: any): any;
    /**
     * Returns true if `node.nodes` array contains the given `node`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * cosole.log(foo.has(bar)); // false
     * foo.push(bar);
     * cosole.log(foo.has(bar)); // true
     * ```
     * @name .has
     * @param {String} `type`
     * @return {Boolean}
     * @api public
     */
    has(node: any): boolean;
    /**
     * Return true if the `node.nodes` has the given `type`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * foo.push(bar);
     *
     * cosole.log(foo.hasType('qux'));          // false
     * cosole.log(foo.hasType(/^(qux|bar)$/));  // true
     * cosole.log(foo.hasType(['qux', 'bar'])); // true
     * ```
     * @name .hasType
     * @param {String} `type`
     * @return {Boolean}
     * @api public
     */
    hasType(type: string): boolean;
    /**
     * Return true if the node is the given `type`.
     *
     * ```js
     * const node = new Node({type: 'bar'});
     * cosole.log(node.isType('foo'));          // false
     * cosole.log(node.isType(/^(foo|bar)$/));  // true
     * cosole.log(node.isType(['foo', 'bar'])); // true
     * ```
     * @name .isType
     * @param {String} `type`
     * @return {Boolean}
     * @api public
     */
    isType(type: string): boolean;
    /**
     * Returns true if `node.value` is an empty string, or `node.nodes` does
     * not contain any non-empty text nodes.
     *
     * ```js
     * const node = new Node({type: 'text'});
     * node.isEmpty(); //=> true
     * node.value = 'foo';
     * node.isEmpty(); //=> false
     * ```
     * @name .isEmpty
     * @param {Function} `fn` (optional) Filter function that is called on `node` and/or child nodes. `isEmpty` will return false immediately when the filter function returns false on any nodes.
     * @return {Boolean}
     * @api public
     */
    isEmpty(fn: Function): boolean;
    /**
     * Returns true if the node has an ancestor node of the given `type`
     *
     * ```js
     * const box = new Node({type: 'box'});
     * const marble = new Node({type: 'marble'});
     * box.push(marble);
     * marble.isInside('box'); //=> true
     * ```
     * @name .isInside
     * @param {String} `type`
     * @return {Boolean}
     * @api public
     */
    isInside(type: string): boolean;
    /**
     * Get the siblings array, or `null` if it doesn't exist.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * foo.push(bar);
     * foo.push(baz);
     *
     * console.log(bar.siblings.length) // 2
     * console.log(baz.siblings.length) // 2
     * ```
     * @getter
     * @name .siblings
     * @return {Array}
     * @api public
     */
    get siblings(): any[];
    /**
     * Calculate the node's current index on `node.parent.nodes`, or `-1` if the
     * node does not have a parent, or is not on `node.parent.nodes`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * const qux = new Node({type: 'qux'});
     * foo.push(bar);
     * foo.push(baz);
     * foo.unshift(qux);
     *
     * console.log(bar.index) // 1
     * console.log(baz.index) // 2
     * console.log(qux.index) // 0
     * ```
     * @setter
     * @getter
     * @name .index
     * @return {Number}
     * @api public
     */
    set index(arg: any);
    get index(): any;
    /**
     * Get the previous node from the [siblings](#siblings) array or `null`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * foo.push(bar);
     * foo.push(baz);
     *
     * console.log(baz.prev.type) // 'bar'
     * ```
     * @getter
     * @name .prev
     * @return {Object}
     * @api public
     */
    get prev(): any;
    /**
     * Get the next element from the [siblings](#siblings) array, or `null` if
     * a next node does not exist.
     *
     * ```js
     * const parent = new Node({type: 'root'});
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * parent.push(foo);
     * parent.push(bar);
     * parent.push(baz);
     *
     * console.log(foo.next.type) // 'bar'
     * console.log(bar.next.type) // 'baz'
     * ```
     * @getter
     * @name .next
     * @return {Object}
     * @api public
     */
    get next(): any;
    /**
     * Get the first child node from `node.nodes`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * const qux = new Node({type: 'qux'});
     * foo.push(bar);
     * foo.push(baz);
     * foo.push(qux);
     *
     * console.log(foo.first.type) // 'bar'
     * ```
     * @getter
     * @name .first
     * @return {Object} The first node, or undefiend
     * @api public
     */
    get first(): any;
    /**
     * Get the last child node from `node.nodes`.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * const bar = new Node({type: 'bar'});
     * const baz = new Node({type: 'baz'});
     * const qux = new Node({type: 'qux'});
     * foo.push(bar);
     * foo.push(baz);
     * foo.push(qux);
     *
     * console.log(foo.last.type) // 'qux'
     * ```
     * @getter
     * @name .last
     * @return {Object} The last node, or undefiend
     * @api public
     */
    get last(): any;
    /**
     * Get the `node.depth`. The root node has a depth of 0. Add 1 to child nodes
     * for each level of nesting.
     *
     * ```js
     * const foo = new Node({type: 'foo'});
     * foo.push(bar);
     *
     * console.log(foo.depth) // 1
     * console.log(bar.depth) // 2
     * ```
     * @getter
     * @name .depth
     * @return {Object} The last node, or undefiend
     * @api public
     */
    get depth(): any;
}
