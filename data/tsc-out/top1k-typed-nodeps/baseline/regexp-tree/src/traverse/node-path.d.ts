export = NodePath;
/**
 * NodePath class encapsulates a traversing node,
 * its parent node, property name in the parent node, and
 * an index (in case if a node is part of a collection).
 * It also provides set of methods for AST manipulation.
 */
declare class NodePath {
    /**
     * Returns a NodePath instance for a node.
     *
     * The same NodePath can be reused in several places, e.g.
     * a parent node passed for all its children.
     */
    static getForNode(node: any, parentPath?: any, prop?: any, index?: number): any;
    /**
     * Initializes the NodePath registry. The registry is a map from
     * a node to its NodePath instance.
     */
    static initRegistry(): void;
    /**
     * Updates index of a currently traversing collection.
     */
    static updateTraversingIndex(dx: any): any;
    /**
     * Returns current traversing index.
     */
    static getTraversingIndex(): any;
    /**
     * NodePath constructor.
     *
     * @param Object node - an AST node
     * @param NodePath parentPath - a nullable parent path
     * @param string property - property name of the node in the parent
     * @param number index - index of the node in a collection.
     */
    constructor(node: any, parentPath?: any, property?: any, index?: any);
    node: any;
    parentPath: any;
    parent: any;
    property: any;
    index: any;
    _enforceProp(property: any): void;
    /**
     * Sets a node into a children collection or the single child.
     * By default child nodes are supposed to be under `expressions` property.
     * An explicit property can be passed.
     *
     * @param Object node - a node to set into a collection or as single child
     * @param number index - index at which to set
     * @param string property - name of the collection or single property
     */
    setChild(node: any, index?: any, property?: any): any;
    /**
     * Appends a node to a children collection.
     * By default child nodes are supposed to be under `expressions` property.
     * An explicit property can be passed.
     *
     * @param Object node - a node to set into a collection or as single child
     * @param string property - name of the collection or single property
     */
    appendChild(node: any, property?: any): any;
    /**
     * Inserts a node into a collection.
     * By default child nodes are supposed to be under `expressions` property.
     * An explicit property can be passed.
     *
     * @param Object node - a node to insert into a collection
     * @param number index - index at which to insert
     * @param string property - name of the collection property
     */
    insertChildAt(node: any, index: any, property?: string): void;
    /**
     * Removes a node.
     */
    remove(): void;
    /**
     * Rebuilds child nodes index (used on remove/insert).
     */
    _rebuildIndex(parent: any, property: any): void;
    /**
     * Whether the path was removed.
     */
    isRemoved(): boolean;
    /**
     * Replaces a node with the passed one.
     */
    replace(newNode: any): any;
    /**
     * Updates a node inline.
     */
    update(nodeProps: any): void;
    /**
     * Returns parent.
     */
    getParent(): any;
    /**
     * Returns nth child.
     */
    getChild(n?: number): any;
    /**
     * Whether a path node is syntactically equal to the passed one.
     *
     * NOTE: we don't rely on `source` property from the `loc` data
     * (which would be the fastest comparison), since it might be unsync
     * after several modifications. We use here simple `JSON.stringify`
     * excluding the `loc` data.
     *
     * @param NodePath other - path to compare to.
     * @return boolean
     */
    hasEqualSource(path: any): boolean;
    /**
     * JSON-encodes a node skipping location.
     */
    jsonEncode({ format, useLoc }?: {
        format: any;
        useLoc: any;
    }): string;
    /**
     * Returns previous sibling.
     */
    getPreviousSibling(): any;
    /**
     * Returns next sibling.
     */
    getNextSibling(): any;
}
declare namespace NodePath {
    const traversingIndexStack: any[];
}
