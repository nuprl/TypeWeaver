export = NFAState;
/**
 * NFA state.
 *
 * Allows nondeterministic transitions to several states on the
 * same symbol, and also epsilon-transitions.
 */
declare class NFAState extends State {
    /**
     * Whether this state matches a string.
     *
     * We maintain set of visited epsilon-states to avoid infinite loops
     * when an epsilon-transition goes eventually to itself.
     *
     * NOTE: this function is rather "educational", since we use DFA for strings
     * matching. DFA is built on top of NFA, and uses fast transition table.
     */
    matches(string: any, visited?: Set<any>): boolean;
    /**
     * Returns an ε-closure for this state:
     * self + all states following ε-transitions.
     */
    getEpsilonClosure(): Set<any>;
    _epsilonClosure: Set<any>;
}
import State = require("../state");
