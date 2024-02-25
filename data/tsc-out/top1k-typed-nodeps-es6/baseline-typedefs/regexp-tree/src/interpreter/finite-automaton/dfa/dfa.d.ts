export default DFA;
declare class DFA {
    constructor(nfa: any);
    _nfa: any;
    minimize(): void;
    _originalAcceptingStateNumbers: any;
    _originalTransitionTable: any;
    getAlphabet(): any;
    getAcceptingStateNumbers(): any;
    getOriginaAcceptingStateNumbers(): any;
    setTransitionTable(table: any): void;
    _transitionTable: any;
    setAcceptingStateNumbers(stateNumbers: any): void;
    _acceptingStateNumbers: any;
    getTransitionTable(): any;
    _remapStateNumbers(calculatedDFATable: any): {};
    getOriginalTransitionTable(): any;
    matches(string: any): boolean;
}
