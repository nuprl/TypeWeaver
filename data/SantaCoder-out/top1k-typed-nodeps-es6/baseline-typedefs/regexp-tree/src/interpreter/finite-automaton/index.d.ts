import NFA from './nfa/nfa';
import DFA from './dfa/dfa';
declare const _default: {
    NFA: typeof NFA;
    DFA: typeof DFA;
    builders: {
        alt: (first: NFAFragment, ...fragments: NFAFragment[]) => NFAFragment;
        char: (c: string) => NFA;
        e: () => NFA;
        or: (first: import("./nfa/nfa-state").default, ...fragments: import("./nfa/nfa-state").default[]) => import("./nfa/nfa-state").default;
        rep: (fragment: NFAFragment) => NFAFragment;
        repExplicit: (fragment: NFAFragment) => NFA;
        plusRep: (fragment: Fragment) => Fragment;
        questionRep: (fragment: Fragment) => Fragment;
    };
    toNFA(regexp: any): any;
    toDFA(regexp: any): DFA;
    test(regexp: any, string: any): any;
};
export default _default;
