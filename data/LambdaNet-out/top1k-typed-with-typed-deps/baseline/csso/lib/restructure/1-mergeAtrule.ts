import { List, walk, keyword as resolveKeyword } from 'css-tree';

const { hasOwnProperty } = Object.prototype;

function addRuleToMap(map: Object, item: Array, list: Map, single: Boolean): Void {
    const node: Object = item.data;
    const name: String = resolveKeyword(node.name).basename;
    const id: String = node.name.toLowerCase() + '/' + (node.prelude ? node.prelude.id : null);

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

function relocateAtrules(ast: Object, options: Object): Void {
    const collected: Object = Object.create(null);
    let topInjectPoint: String = null;

    ast.children.forEach(function(node: Object, item: Number, list: Object) {
        if (node.type === 'Atrule') {
            const name: String = resolveKeyword(node.name).basename;

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

function isMediaRule(node: Object): Boolean {
    return node.type === 'Atrule' && node.name === 'media';
}

function processAtrule(node: Object, item: Object, list: Map): Void {
    if (!isMediaRule(node)) {
        return;
    }

    const prev: Object = item.prev && item.prev.data;

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

export default function rejoinAtrule(ast: String, options: Object): Void {
    relocateAtrules(ast, options);

    walk(ast, {
        visit: 'Atrule',
        reverse: true,
        enter: processAtrule
    });
};