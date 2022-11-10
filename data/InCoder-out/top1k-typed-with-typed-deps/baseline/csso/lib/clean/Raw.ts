import { isNodeChildrenList } from './utils.js';

export default function cleanRaw(node: Node,  item: Item,  list: List) {
    // raw in stylesheet or block children
    if (isNodeChildrenList(this.stylesheet, list) ||
        isNodeChildrenList(this.block, list)) {
        list.remove(item);
    }
};