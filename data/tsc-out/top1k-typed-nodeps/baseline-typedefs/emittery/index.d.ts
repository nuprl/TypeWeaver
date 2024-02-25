declare class Emittery {
    static mixin(emitteryPropertyName: any, methodNames: any): (target: any) => any;
    static set isDebugEnabled(arg: boolean);
    static get isDebugEnabled(): boolean;
    constructor(options?: {});
    debug: any;
    logIfDebugEnabled(type: any, eventName: any, eventData: any): void;
    on(eventNames: any, listener: any): any;
    off(eventNames: any, listener: any): void;
    once(eventNames: any): Promise<any>;
    events(eventNames: any): {
        next(): any;
        return(value: any, ...args: any[]): Promise<{
            done: boolean;
            value: any;
        } | {
            done: boolean;
            value?: undefined;
        }>;
        [Symbol.asyncIterator](): any;
    };
    emit(eventName: any, eventData: any): Promise<void>;
    emitSerial(eventName: any, eventData: any): Promise<void>;
    onAny(listener: any): any;
    anyEvent(): {
        next(): any;
        return(value: any, ...args: any[]): Promise<{
            done: boolean;
            value: any;
        } | {
            done: boolean;
            value?: undefined;
        }>;
        [Symbol.asyncIterator](): any;
    };
    offAny(listener: any): void;
    clearListeners(eventNames: any): void;
    listenerCount(eventNames: any): number;
    bindMethods(target: any, methodNames: any): void;
}
declare namespace Emittery {
    const listenerAdded: symbol;
    const listenerRemoved: symbol;
}
export default Emittery;
