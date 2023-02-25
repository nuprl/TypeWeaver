import { property } from 'css-tree';

export default function cleanDeclartion(node: Node, item: Declaration, list: DeclarationList) {
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