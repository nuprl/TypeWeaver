declare namespace _default {
    export { RegExpTree };
}
export default _default;
/**
 * The `RegExpTree` class provides runtime support for `compat-transpiler`
 * module from `regexp-tree`.
 *
 * E.g. it tracks names of the capturing groups, in order to access the
 * names on the matched result.
 *
 * It's a thin-wrapper on top of original regexp.
 */
declare class RegExpTree {
    /**
     * Initializes a `RegExpTree` instance.
     *
     * @param RegExp - a regular expression
     *
     * @param Object state:
     *
     *   An extra state which may store any related to transformation
     *   data, for example, names of the groups.
     *
     *   - flags - original flags
     *   - groups - names of the groups, and their indices
     *   - source - original source
     */
    constructor(re: any, { flags, groups, source, }: {
        flags: any;
        groups: any;
        source: any;
    });
    _re: any;
    _groups: any;
    flags: any;
    source: any;
    dotAll: any;
    global: any;
    ignoreCase: any;
    multiline: any;
    sticky: any;
    unicode: any;
    /**
     * Facade wrapper for RegExp `test` method.
     */
    test(string: any): any;
    /**
     * Facade wrapper for RegExp `compile` method.
     */
    compile(string: any): any;
    /**
     * Facade wrapper for RegExp `toString` method.
     */
    toString(): string;
    _toStringResult: string;
    /**
     * Facade wrapper for RegExp `exec` method.
     */
    exec(string: any): any;
}
