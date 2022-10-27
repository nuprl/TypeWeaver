export default function (obj: String, opts: Object) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space: Number = opts.space || '';
    if (typeof space === 'number') space = Array(space+1).join(' ');
    var cycles: Boolean = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
    var replacer: Function = opts.replacer || function(key: String, value: Number) { return value; };

    var cmp: Function = opts.cmp && (function (f: Function) {
        return function (node: Object) {
            return function (a: String, b: String) {
                var aobj: Object = { key: a, value: node[a] };
                var bobj: Object = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen: Array = [];
    return (function stringify (parent: String, key: String, node: Object, level: String): String {
        var indent: String = space ? ('\n' + new Array(level + 1).join(space)) : '';
        var colonSeparator: String = space ? ': ' : ':';

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
            var out: Array = [];
            for (var i = 0; i < node.length; i++) {
                var item: Number = stringify(node, i, node[i], level+1) || JSON.stringify(null);
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

            var keys: Array = objectKeys(node).sort(cmp && cmp(node));
            var out: Array = [];
            for (var i = 0; i < keys.length; i++) {
                var key: String = keys[i];
                var value: Number = stringify(node, key, node[key], level+1);

                if(!value) continue;

                var keyValue: String = JSON.stringify(key)
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

var isArray: Function = Array.isArray || function (x: String) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys: Function = Object.keys || function (obj: Array) {
    var has: Function = Object.prototype.hasOwnProperty || function () { return true };
    var keys: Array = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};
