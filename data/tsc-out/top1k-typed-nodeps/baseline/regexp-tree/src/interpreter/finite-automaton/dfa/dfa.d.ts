export = DFA;
/**
 * DFA is build by converting from NFA (subset construction).
 */
declare class DFA {
    constructor(nfa: any);
    _nfa: any;
    /**
     * Minimizes DFA.
     */
    minimize(): void;
    _originalAcceptingStateNumbers: any;
    _originalTransitionTable: any;
    /**
     * Returns alphabet for this DFA.
     */
    getAlphabet(): any;
    /**
     * Returns accepting states.
     */
    getAcceptingStateNumbers(): any;
    /**
     * Returns original accepting states.
     */
    getOriginaAcceptingStateNumbers(): any;
    /**
     * Sets transition table.
     */
    setTransitionTable(table: any): void;
    _transitionTable: any;
    /**
     * Sets accepting states.
     */
    setAcceptingStateNumbers(stateNumbers: any): void;
    _acceptingStateNumbers: any;
    /**
     * DFA transition table is built from NFA table.
     */
    getTransitionTable(): any;
    /**
     * Remaps state numbers in the resulting table:
     * combined states '1,2,3' -> 1, '3,4' -> 2, etc.
     */
    _remapStateNumbers(calculatedDFATable: any): {};
    /**
     * Returns original DFA table, where state numbers
     * are combined numbers from NFA.
     */
    getOriginalTransitionTable(): any;
    /**
     * Checks whether this DFA accepts a string.
     */
    matches(string: any): boolean;
}
