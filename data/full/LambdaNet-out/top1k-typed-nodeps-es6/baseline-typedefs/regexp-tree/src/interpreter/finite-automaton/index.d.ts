import NFA from './nfa/nfa';
import DFA from './dfa/dfa';
declare const _default: {
    NFA: typeof NFA;
    DFA: typeof DFA;
    builders: {
        alt: (first: DFA, ...fragments: any[]) => string;
        char: (c: string) => State;
        e: () => State;
        or: (first: DFA, ...fragments: any[]) => State;
        rep: (fragment: Writer) => DFA;
        repExplicit: (fragment: Writer) => DFA;
        plusRep: (fragment: DFA) => DFA;
        questionRep: (fragment: DFA) => DFA;
    };
    toNFA(regexp: any): string;
    toDFA(regexp: any): DFA;
    test(regexp: any, string: any): any;
};
export default _default;
