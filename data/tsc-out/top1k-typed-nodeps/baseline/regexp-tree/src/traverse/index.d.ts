/**
 * Traverses an AST.
 *
 * @param Object ast - an AST node
 *
 * @param Object | Array<Object> handlers:
 *
 *   an object (or an array of objects)
 *
 *   Each such object contains a handler function per node.
 *   In case of an array of handlers, they are applied in order.
 *   A handler may return a transformed node (or a different type).
 *
 *   The per-node function may instead be an object with functions pre and post.
 *   pre is called before visiting the node, post after.
 *   If a handler is a function, it is treated as the pre function, with an empty post.
 *
 * @param Object options:
 *
 *   a config object, specifying traversal options:
 *
 *   `asNodes`: boolean - whether handlers should receives raw AST nodes
 *   (false by default), instead of a `NodePath` wrapper. Note, by default
 *   `NodePath` wrapper provides a set of convenient method to manipulate
 *   a traversing AST, and also has access to all parents list. A raw
 *   nodes traversal should be used in rare cases, when no `NodePath`
 *   features are needed.
 *
 * Special hooks:
 *
 *   - `shouldRun(ast)` - a predicate determining whether the handler
 *                        should be applied.
 *
 * NOTE: Multiple handlers are used as an optimization of applying all of
 * them in one AST traversal pass.
 */
export function traverse(ast: any, handlers: any, options?: {
    asNodes: boolean;
}): void;
