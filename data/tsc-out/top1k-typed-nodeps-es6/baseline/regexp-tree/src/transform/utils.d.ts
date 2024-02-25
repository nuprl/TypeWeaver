declare namespace _default {
    export { disjunctionToList };
    export { listToDisjunction };
    export { increaseQuantifierByOne };
}
export default _default;
/**
 * Flattens a nested disjunction node to a list.
 *
 * /a|b|c|d/
 *
 * {{{a, b}, c}, d} -> [a, b, c, d]
 */
declare function disjunctionToList(node: any): any;
/**
 * Builds a nested disjunction node from a list.
 *
 * /a|b|c|d/
 *
 * [a, b, c, d] -> {{{a, b}, c}, d}
 */
declare function listToDisjunction(list: any): any;
/**
 * Increases a quantifier by one.
 * Does not change greediness.
 * * -> +
 * + -> {2,}
 * ? -> {1,2}
 * {2} -> {3}
 * {2,} -> {3,}
 * {2,3} -> {3,4}
 */
declare function increaseQuantifierByOne(quantifier: any): void;
