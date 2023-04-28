import { isNodeChildrenList } from './utils.js';

export default function cleanRaw(node: Node, item: Node, list: NodeList) {
    // raw in stylesheet or block children
    if (isNodeChildrenList(this.stylesheet, list) ||
        isNodeChildrenList(this.block, list)) {
        list.remove(item);
    }
};