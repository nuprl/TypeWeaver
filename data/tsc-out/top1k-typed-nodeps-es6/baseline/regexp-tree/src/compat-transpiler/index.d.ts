declare namespace _default {
    /**
     * Translates a regexp in new syntax to equivalent regexp in old syntax.
     *
     * @param string|RegExp|AST - regexp
     * @param Array transformsWhitelist - names of the transforms to apply
     */
    function transform(regexp: any, transformsWhitelist?: any[]): undefined;
}
export default _default;
