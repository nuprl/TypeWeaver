const { hasOwnProperty } = Object.prototype;

export function isEqualSelectors(a: Object, b: Object): Boolean {
    let cursor1: Object = a.head;
    let cursor2: Object = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

export function isEqualDeclarations(a: Object, b: Object): Boolean {
    let cursor1: Object = a.head;
    let cursor2: Object = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

export function compareDeclarations(declarations1: Function, declarations2: Object): TRBL {
    const result: Object = {
        eq: [],
        ne1: [],
        ne2: [],
        ne2overrided: []
    };

    const fingerprints: Object = Object.create(null);
    const declarations2hash: Object = Object.create(null);

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        declarations2hash[cursor.data.id] = true;
    }

    for (let cursor = declarations1.head; cursor; cursor = cursor.next)  {
        const data: HTMLElement = cursor.data;

        if (data.fingerprint) {
            fingerprints[data.fingerprint] = data.important;
        }

        if (declarations2hash[data.id]) {
            declarations2hash[data.id] = false;
            result.eq.push(data);
        } else {
            result.ne1.push(data);
        }
    }

    for (let cursor = declarations2.head; cursor; cursor = cursor.next)  {
        const data: HTMLElement = cursor.data;

        if (declarations2hash[data.id]) {
            // when declarations1 has an overriding declaration, this is not a difference
            // unless no !important is used on prev and !important is used on the following
            if (!hasOwnProperty.call(fingerprints, data.fingerprint) ||
                (!fingerprints[data.fingerprint] && data.important)) {
                result.ne2.push(data);
            }

            result.ne2overrided.push(data);
        }
    }

    return result;
}

export function addSelectors(dest: HTMLElement, source: Array): Object {
    source.forEach((sourceData: Object) => {
        const newStr: String = sourceData.id;
        let cursor: Object = dest.head;

        while (cursor) {
            const nextStr: String = cursor.data.id;

            if (nextStr === newStr) {
                return;
            }

            if (nextStr > newStr) {
                break;
            }

            cursor = cursor.next;
        }

        dest.insert(dest.createItem(sourceData), cursor);
    });

    return dest;
}

// check if simpleselectors has no equal specificity and element selector
export function hasSimilarSelectors(selectors1: Object, selectors2: Object): Boolean {
    let cursor1: Object = selectors1.head;

    while (cursor1 !== null) {
        let cursor2: Object = selectors2.head;

        while (cursor2 !== null) {
            if (cursor1.data.compareMarker === cursor2.data.compareMarker) {
                return true;
            }

            cursor2 = cursor2.next;
        }

        cursor1 = cursor1.next;
    }

    return false;
}

// test node can't to be skipped
export function unsafeToSkipNode(node: Object): Boolean {
    switch (node.type) {
        case 'Rule':
            // unsafe skip ruleset with selector similarities
            return hasSimilarSelectors(node.prelude.children, this);

        case 'Atrule':
            // can skip at-rules with blocks
            if (node.block) {
                // unsafe skip at-rule if block contains something unsafe to skip
                return node.block.children.some(unsafeToSkipNode, this);
            }
            break;

        case 'Declaration':
            return false;
    }

    // unsafe by default
    return true;
}
