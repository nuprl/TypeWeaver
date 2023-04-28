import NFA from './nfa/nfa';
import DFA from './dfa/dfa';
declare const _default: {
    NFA: typeof NFA;
    DFA: typeof DFA;
    builders: {
        alt: (first: any, ...fragments: any[]) => any;
        char: (c: string) => NFA;
        e: () => NFA;
        or: (first: Function, ...fragments: Function[]) => Function;
        rep: (fragment: string) => string;
        repExplicit: (fragment: Fragment) => NFA;
        plusRep: (fragment: string) => string;
        questionRep: (fragment: string) => string;
    };
    toNFA(regexp: any): any;
    toDFA(regexp: any): DFA;
    test(regexp: any, string: any): any;
};
export default _default;
