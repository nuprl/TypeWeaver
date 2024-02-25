declare namespace _default {
    export { NFA };
    export { DFA };
    export { builders };
    export function toNFA(regexp: any): any;
    export function toDFA(regexp: any): DFA;
    export function test(regexp: any, string: any): boolean;
}
export default _default;
import NFA from "./nfa/nfa";
import DFA from "./dfa/dfa";
import builders from "./nfa/builders";
