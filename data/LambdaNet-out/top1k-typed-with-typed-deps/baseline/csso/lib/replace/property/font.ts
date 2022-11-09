export default function compressFont(node: Object): Void {
    const list: HTMLElement = node.children;

    list.forEachRight(function(node: Object, item: Object) {
        if (node.type === 'Identifier') {
            if (node.name === 'bold') {
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '700'
                };
            } else if (node.name === 'normal') {
                const prev: Object = item.prev;

                if (prev && prev.data.type === 'Operator' && prev.data.value === '/') {
                    this.remove(prev);
                }

                this.remove(item);
            }
        }
    });

    if (list.isEmpty) {
        list.insert(list.createItem({
            type: 'Identifier',
            name: 'normal'
        }));
    }
};
