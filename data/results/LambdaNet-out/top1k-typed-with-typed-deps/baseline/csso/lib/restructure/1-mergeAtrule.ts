import { List, walk, keyword as resolveKeyword } from 'css-tree';

const { hasOwnProperty } = Object.prototype;

function addRuleToMap(map: object, item: any[], list: Map, single: boolean): void {
    const node: object = item.data;
    const name: string = resolveKeyword(node.name).basename;
    const id: string = node.name.toLowerCase() + '/' + (node.prelude ? node.prelude.id : null);

    if (!hasOwnProperty.call(map, name)) {
        map[name] = Object.create(null);
    }

    if (single) {
        delete map[name][id];
    }

    if (!hasOwnProperty.call(map[name], id)) {
        map[name][id] = new List();
    }

    map[name][id].append(list.remove(item));
}

function relocateAtrules(ast: object, options: object): void {
    const collected: object = Object.create(null);
    let topInjectPoint: string = null;

    ast.children.forEach(function(node: object, item: number, list: object) {
        if (node.type === 'Atrule') {
            const name: string = resolveKeyword(node.name).basename;

            switch (name) {
                case 'keyframes':
                    addRuleToMap(collected, item, list, true);
                    return;

                case 'media':
                    if (options.forceMediaMerge) {
                        addRuleToMap(collected, item, list, false);
                        return;
                    }
                    break;
            }

            if (topInjectPoint === null &&
                name !== 'charset' &&
                name !== 'import') {
                topInjectPoint = item;
            }
        } else {
            if (topInjectPoint === null) {
                topInjectPoint = item;
            }
        }
    });

    for (const atrule in collected) {
        for (const id in collected[atrule]) {
            ast.children.insertList(
                collected[atrule][id],
                atrule === 'media' ? null : topInjectPoint
            );
        }
    }
};

function isMediaRule(node: object): boolean {
    return node.type === 'Atrule' && node.name === 'media';
}

function processAtrule(node: object, item: object, list: Map): void {
    if (!isMediaRule(node)) {
        return;
    }

    const prev: object = item.prev && item.prev.data;

    if (!prev || !isMediaRule(prev)) {
        return;
    }

    // merge @media with same query
    if (node.prelude &&
        prev.prelude &&
        node.prelude.id === prev.prelude.id) {
        prev.block.children.appendList(node.block.children);
        list.remove(item);

        // TODO: use it when we can refer to several points in source
        // prev.loc = {
        //     primary: prev.loc,
        //     merged: node.loc
        // };
    }
}

export default function rejoinAtrule(ast: string, options: object): void {
    relocateAtrules(ast, options);

    walk(ast, {
        visit: 'Atrule',
        reverse: true,
        enter: processAtrule
    });
};
