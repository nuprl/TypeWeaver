export default function compressFont(node: object): Void {
    const list: HTMLElement = node.children;

    list.forEachRight(function(node: object, item: object) {
        if (node.type === 'Identifier') {
            if (node.name === 'bold') {
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '700'
                };
            } else if (node.name === 'normal') {
                const prev: HTMLElement = item.prev;

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
