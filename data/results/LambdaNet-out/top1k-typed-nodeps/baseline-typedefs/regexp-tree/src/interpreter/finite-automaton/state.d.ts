declare class State {
    constructor({ accepting, }?: {
        accepting?: boolean;
    });
    getTransitions(): any;
    addTransition(symbol: any, toState: any): this;
    getTransitionsOnSymbol(symbol: any): HTMLElement;
}
