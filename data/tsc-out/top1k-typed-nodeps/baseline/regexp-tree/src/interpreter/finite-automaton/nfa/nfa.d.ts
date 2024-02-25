export = NFA;
/**
 * NFA fragment.
 *
 * NFA sub-fragments can be combined to a larger NFAs building
 * the resulting machine. Combining the fragments is done by patching
 * edges of the in- and out-states.
 *
 * 2-states implementation, `in`, and `out`. Eventually all transitions
 * go to the same `out`, which can further be connected via ε-transition
 * with other fragment.
 */
declare class NFA {
    constructor(inState: any, outState: any);
    in: any;
    out: any;
    /**
     * Tries to recognize a string based on this NFA fragment.
     */
    matches(string: any): any;
    /**
     * Returns an alphabet for this NFA.
     */
    getAlphabet(): Set<any>;
    _alphabet: Set<any>;
    /**
     * Returns set of accepting states.
     */
    getAcceptingStates(): Set<any>;
    /**
     * Returns accepting state numbers.
     */
    getAcceptingStateNumbers(): Set<any>;
    _acceptingStateNumbers: Set<any>;
    /**
     * Builds and returns transition table.
     */
    getTransitionTable(): {};
    _transitionTable: {};
    _acceptingStates: Set<any>;
}
