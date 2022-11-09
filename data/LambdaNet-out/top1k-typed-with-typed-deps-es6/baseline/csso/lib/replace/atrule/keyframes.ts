export default function(node: Object) {
    node.block.children.forEach((rule: Object) => {
        rule.prelude.children.forEach((simpleselector: TRBL) => {
            simpleselector.children.forEach((data: Object, item: Array) => {
                if (data.type === 'Percentage' && data.value === '100') {
                    item.data = {
                        type: 'TypeSelector',
                        loc: data.loc,
                        name: 'to'
                    };
                } else if (data.type === 'TypeSelector' && data.name === 'from') {
                    item.data = {
                        type: 'Percentage',
                        loc: data.loc,
                        value: '0'
                    };
                }
            });
        });
    });
};
