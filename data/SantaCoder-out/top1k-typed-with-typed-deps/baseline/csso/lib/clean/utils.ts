export function hasNoChildren(node: TreeNode<any>) {
    return !node || !node.children || node.children.isEmpty;
}

export function isNodeChildrenList(node: Node, list: NodeChildrenList) {
    return node !== null && node.children === list;
}