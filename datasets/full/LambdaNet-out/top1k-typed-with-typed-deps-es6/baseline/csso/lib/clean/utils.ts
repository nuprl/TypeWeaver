export function hasNoChildren(node: object): boolean {
    return !node || !node.children || node.children.isEmpty;
}

export function isNodeChildrenList(node: object, list: object): boolean {
    return node !== null && node.children === list;
}
