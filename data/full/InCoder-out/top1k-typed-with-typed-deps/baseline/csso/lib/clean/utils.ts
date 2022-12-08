export function hasNoChildren(node: Node) {
    return !node || !node.children || node.children.isEmpty;
}

export function isNodeChildrenList(node: Node,  list: Node[]) {
    return node !== null && node.children === list;
}