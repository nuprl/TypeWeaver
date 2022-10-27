export function hasNoChildren(node: Object): Boolean {
    return !node || !node.children || node.children.isEmpty;
}

export function isNodeChildrenList(node: Object, list: Object): Boolean {
    return node !== null && node.children === list;
}
