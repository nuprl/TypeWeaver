module.exports = function (obj: string, opts: object) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space: number = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles: boolean = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer: Function = opts.replacer || function(key: string, value: number) { return value; };

    var cmp: Function = opts.cmp && (function (f: Function) {
        return function (node: object) {
            return function (a: string, b: string) {
                var aobj: object = { key: a, value: node[a] };
                var bobj: object = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen: any[] = [];
    return (function stringify (parent: string, key: string, node: object, level: string): string {
        var indent: string = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator: string = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if (typeof node !== 'object' || node === null) {
            return JSON.stringify(node);
        }
        if (isArray(node)) {
            var out: any[] = [];
            for (var i = 0; i < node.length; i++) {
                var item: number = stringify(node, i, node[i], level+1) || JSON.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        }
        else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return JSON.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            }
            else seen.push(node);

            var keys: any[] = objectKeys(node).sort(cmp && cmp(node));
            var out: any[] = [];
            for (var i = 0; i < keys.length; i++) {
                var key: string = keys[i];
                var value: number = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue: string = JSON.stringify(key)
                    + colonSeparator
                    + value;
                ;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    })({ '': obj }, '', obj, 0);
};

var isArray: Function = Array.isArray || function (x: string) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys: Function = Object.keys || function (obj: any[]) {
    var has: Function = Object.prototype.hasOwnProperty || function () { return true };
    var keys: any[] = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};
