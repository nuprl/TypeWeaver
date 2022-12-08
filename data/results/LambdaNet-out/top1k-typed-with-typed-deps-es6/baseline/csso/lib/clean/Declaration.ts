import { property } from 'css-tree';

export default function cleanDeclartion(node: object, item: string, list: Map): void {
    if (node.value.children && node.value.children.isEmpty) {
        list.remove(item);
        return;
    }

    if (property(node.property).custom) {
        if (/\S/.test(node.value.value)) {
            node.value.value = node.value.value.trim();
        }
    }
};
