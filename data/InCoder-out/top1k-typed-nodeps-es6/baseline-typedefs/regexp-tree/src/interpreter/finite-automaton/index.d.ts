import NFA from './nfa/nfa';
import DFA from './dfa/dfa';
declare const _default: {
    NFA: typeof NFA;
    DFA: typeof DFA;
    builders: {
        alt: (first: ST, ...fragments: T[]) => ST;
        char: (c: number) => NFA;
        e: () => NFA;
        or: (first: xpression, ...fragments: pression[]) => xpression;
        rep: (fragment: string | RegExp) => string | RegExp;
        repExplicit: (fragment: import("./nfa/nfa-state").default) => NFA;
        plusRep: (fragment: Fragment) => Fragment;
        questionRep: (fragment: Fragment) => Fragment;
    };
    toNFA(regexp: any): any;
    toDFA(regexp: any): DFA;
    test(regexp: any, string: any): any;
};
export default _default;
