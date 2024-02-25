import NFA = require("./nfa/nfa");
import DFA = require("./dfa/dfa");
import builders = require("./nfa/builders");
export declare function toNFA(regexp: any): any;
export declare function toDFA(regexp: any): DFA;
export declare function test(regexp: any, string: any): boolean;
export { NFA, DFA, builders };
