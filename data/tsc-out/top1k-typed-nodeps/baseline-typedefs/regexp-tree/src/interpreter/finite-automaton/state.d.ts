export = State;
declare class State {
    constructor({ accepting, }?: {
        accepting?: boolean;
    });
    _transitions: Map<any, any>;
    accepting: boolean;
    getTransitions(): Map<any, any>;
    addTransition(symbol: any, toState: any): State;
    getTransitionsOnSymbol(symbol: any): any;
}
