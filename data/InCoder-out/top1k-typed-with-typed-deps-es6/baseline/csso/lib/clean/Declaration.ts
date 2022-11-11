import { property } from 'css-tree';

export default function cleanDeclartion(node: ASTDeclaration,  item: ASTDeclaration,  list: ASTList) {
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