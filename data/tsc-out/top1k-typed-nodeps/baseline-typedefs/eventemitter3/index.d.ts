export = EventEmitter;
declare function EventEmitter(): void;
declare class EventEmitter {
    _events: Events;
    _eventsCount: number;
    public eventNames(): any[];
    public listeners(event: (string | Symbol)): any[];
    public listenerCount(event: (string | Symbol)): number;
    public emit(event: (string | Symbol), a1: any, a2: any, a3: any, a4: any, a5: any, ...args: any[]): boolean;
    public on(event: (string | Symbol), fn: Function, context?: any): EventEmitter;
    public once(event: (string | Symbol), fn: Function, context?: any): EventEmitter;
    public removeListener(event: (string | Symbol), fn: Function, context: any, once: boolean): EventEmitter;
    public removeAllListeners(event?: (string | Symbol)): EventEmitter;
    off: any;
    addListener: any;
}
declare namespace EventEmitter {
    export { prefix as prefixed };
    export { EventEmitter };
}
declare function Events(): void;
declare class Events {
}
declare var prefix: string;
