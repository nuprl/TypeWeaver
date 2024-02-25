declare namespace _default {
    export { minimize };
}
export default _default;
/**
 * Takes a DFA, and returns a minimized version of it
 * compressing some states to groups (using standard, 0-, 1-,
 * 2-, ... N-equivalence algorithm).
 */
declare function minimize(dfa: any): any;
