export = State;
/**
 * A generic FA State class (base for NFA and DFA).
 *
 * Maintains the transition map, and the flag whether
 * the state is accepting.
 */
declare class State {
    constructor({ accepting, }?: {
        accepting?: boolean;
    });
    /**
     * Outgoing transitions to other states.
     */
    _transitions: Map<any, any>;
    /**
     * Whether the state is accepting.
     */
    accepting: boolean;
    /**
     * Returns transitions for this state.
     */
    getTransitions(): Map<any, any>;
    /**
     * Creates a transition on symbol.
     */
    addTransition(symbol: any, toState: any): State;
    /**
     * Returns transitions set on symbol.
     */
    getTransitionsOnSymbol(symbol: any): any;
}
