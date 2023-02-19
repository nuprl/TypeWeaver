import { isNodeChildrenList } from './utils.js';

export default function cleanRaw(node: object, item: string, list: Map): void {
    // raw in stylesheet or block children
    if (isNodeChildrenList(this.stylesheet, list) ||
        isNodeChildrenList(this.block, list)) {
        list.remove(item);
    }
};
