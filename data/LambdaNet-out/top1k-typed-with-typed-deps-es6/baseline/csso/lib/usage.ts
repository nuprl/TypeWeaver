const { hasOwnProperty } = Object.prototype;

function buildMap(list: Array, caseInsensitive: Boolean): Object {
    const map: Object = Object.create(null);

    if (!Array.isArray(list)) {
        return null;
    }

    for (let name of list) {
        if (caseInsensitive) {
            name = name.toLowerCase();
        }

        map[name] = true;
    }

    return map;
}

function buildList(data: Object): Object {
    if (!data) {
        return null;
    }

    const tags: Array = buildMap(data.tags, true);
    const ids: String = buildMap(data.ids);
    const classes: String = buildMap(data.classes);

    if (tags === null &&
        ids === null &&
        classes === null) {
        return null;
    }

    return {
        tags,
        ids,
        classes
    };
}

export function buildIndex(data: Object): Object {
    let scopes: Boolean = false;

    if (data.scopes && Array.isArray(data.scopes)) {
        scopes = Object.create(null);

        for (let i = 0; i < data.scopes.length; i++) {
            const list: Array = data.scopes[i];

            if (!list || !Array.isArray(list)) {
                throw new Error('Wrong usage format');
            }

            for (const name of list) {
                if (hasOwnProperty.call(scopes, name)) {
                    throw new Error(`Class can't be used for several scopes: ${name}`);
                }

                scopes[name] = i + 1;
            }
        }
    }

    return {
        whitelist: buildList(data),
        blacklist: buildList(data.blacklist),
        scopes
    };
}
