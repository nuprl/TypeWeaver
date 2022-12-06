export default function(node: object) {
    node.block.children.forEach((rule: object) => {
        rule.prelude.children.forEach((simpleselector: object) => {
            simpleselector.children.forEach((data: object, item: any[]) => {
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
