declare namespace _default {
    export { NFA };
    export { DFA };
    export { builders };
    /**
     * Builds an NFA for the passed regexp.
     *
     * @param string | AST | RegExp:
     *
     *   a regular expression in different representations: a string,
     *   a RegExp object, or an AST.
     */
    export function toNFA(regexp: any): any;
    /**
     * Builds DFA for the passed regexp.
     *
     * @param string | AST | RegExp:
     *
     *   a regular expression in different representations: a string,
     *   a RegExp object, or an AST.
     */
    export function toDFA(regexp: any): DFA;
    /**
     * Returns true if regexp accepts the string.
     */
    export function test(regexp: any, string: any): boolean;
}
export default _default;
import NFA from "./nfa/nfa";
import DFA from "./dfa/dfa";
import builders from "./nfa/builders";
