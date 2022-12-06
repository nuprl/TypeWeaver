declare const State: any;
declare const EPSILON: any;
declare class NFAState extends State {
    matches(string: any, visited?: Set<unknown>): boolean;
    getEpsilonClosure(): any;
}
