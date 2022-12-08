declare const DFAMinimizer: any;
declare const EPSILON_CLOSURE: any;
declare class DFA {
    constructor(nfa: any);
    minimize(): void;
    getAlphabet(): any;
    getAcceptingStateNumbers(): any;
    getOriginaAcceptingStateNumbers(): any;
    setTransitionTable(table: any): void;
    setAcceptingStateNumbers(stateNumbers: any): void;
    getTransitionTable(): any;
    _remapStateNumbers(calculatedDFATable: any): {};
    getOriginalTransitionTable(): any;
    matches(string: any): boolean;
}
