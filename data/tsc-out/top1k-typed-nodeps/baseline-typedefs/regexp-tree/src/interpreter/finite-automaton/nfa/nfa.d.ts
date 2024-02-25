export = NFA;
declare class NFA {
    constructor(inState: any, outState: any);
    in: any;
    out: any;
    matches(string: any): any;
    getAlphabet(): Set<any>;
    _alphabet: Set<any>;
    getAcceptingStates(): Set<any>;
    getAcceptingStateNumbers(): Set<any>;
    _acceptingStateNumbers: Set<any>;
    getTransitionTable(): {};
    _transitionTable: {};
    _acceptingStates: Set<any>;
}
