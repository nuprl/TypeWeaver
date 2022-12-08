declare class NFA {
    constructor(inState: any, outState: any);
    matches(string: any): any;
    getAlphabet(): any;
    getAcceptingStates(): any;
    getAcceptingStateNumbers(): any;
    getTransitionTable(): any;
}
export default NFA;
