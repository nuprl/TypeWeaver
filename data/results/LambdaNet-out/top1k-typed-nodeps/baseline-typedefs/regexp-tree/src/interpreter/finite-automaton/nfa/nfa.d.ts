declare const EPSILON: any, EPSILON_CLOSURE: any;
declare class NFA {
    constructor(inState: any, outState: any);
    matches(string: any): any;
    getAlphabet(): any;
    getAcceptingStates(): any;
    getAcceptingStateNumbers(): any;
    getTransitionTable(): any;
}
