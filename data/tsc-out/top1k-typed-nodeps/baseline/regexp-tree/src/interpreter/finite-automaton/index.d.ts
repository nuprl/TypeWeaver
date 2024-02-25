import NFA = require("./nfa/nfa");
import DFA = require("./dfa/dfa");
import builders = require("./nfa/builders");
/**
 * Builds an NFA for the passed regexp.
 *
 * @param string | AST | RegExp:
 *
 *   a regular expression in different representations: a string,
 *   a RegExp object, or an AST.
 */
export declare function toNFA(regexp: any): any;
/**
 * Builds DFA for the passed regexp.
 *
 * @param string | AST | RegExp:
 *
 *   a regular expression in different representations: a string,
 *   a RegExp object, or an AST.
 */
export declare function toDFA(regexp: any): DFA;
/**
 * Returns true if regexp accepts the string.
 */
export declare function test(regexp: any, string: any): boolean;
export { NFA, DFA, builders };
