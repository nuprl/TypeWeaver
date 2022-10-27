export default function compressBorder(node: Object): Void {
    node.children.forEach((node: Object, item: Array, list: Object) => {
        if (node.type === 'Identifier' && node.name.toLowerCase() === 'none') {
            if (list.head === list.tail) {
                // replace `none` for zero when `none` is a single term
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '0'
                };
            } else {
                list.remove(item);
            }
        }
    });
};
