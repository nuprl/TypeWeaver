/**
 * Translates a regexp in new syntax to equivalent regexp in old syntax.
 *
 * @param string|RegExp|AST - regexp
 * @param Array transformsWhitelist - names of the transforms to apply
 */
export function transform(regexp: any, transformsWhitelist?: any[]): undefined;
