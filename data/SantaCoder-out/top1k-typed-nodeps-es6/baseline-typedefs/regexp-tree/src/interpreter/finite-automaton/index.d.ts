import NFA from './nfa/nfa';
import DFA from './dfa/dfa';
declare const _default: {
    NFA: typeof NFA;
    DFA: typeof DFA;
    builders: {
        alt: (first: T, ...fragments: T[]) => T;
        char: (c: string) => NFA;
        e: () => NFA;
        or: (first: any, ...fragments: any[]) => any;
        rep: (fragment: string) => string;
        repExplicit: (fragment: string) => NFA;
        plusRep: (fragment: string) => string;
        questionRep: (fragment: string) => string;
    };
    toNFA(regexp: any): any;
    toDFA(regexp: any): DFA;
    test(regexp: any, string: any): any;
};
export default _default;
