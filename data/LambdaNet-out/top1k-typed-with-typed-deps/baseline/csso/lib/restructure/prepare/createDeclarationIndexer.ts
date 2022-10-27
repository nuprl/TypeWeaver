import { generate } from 'css-tree';

class Index {
    constructor() {
        this.map = new Map();
    }
    resolve(str) {
        let index: String = this.map.get(str);

        if (index === undefined) {
            index = this.map.size + 1;
            this.map.set(str, index);
        }

        return index;
    }
};

export default function createDeclarationIndexer(): Function {
    const ids: TRBL = new Index();

    return function markDeclaration(node: Object): Function {
        const id: String = generate(node);

        node.id = ids.resolve(id);
        node.length = id.length;
        node.fingerprint = null;

        return node;
    };
};
