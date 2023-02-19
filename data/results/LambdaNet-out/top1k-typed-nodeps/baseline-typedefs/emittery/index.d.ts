export default class Emittery {
    static mixin(emitteryPropertyName: any, methodNames: any): (target: any) => any;
    static get isDebugEnabled(): boolean;
    static set isDebugEnabled(newValue: boolean);
    constructor(options?: {});
    logIfDebugEnabled(type: any, eventName: any, eventData: any): void;
    on(eventNames: any, listener: any): any;
    off(eventNames: any, listener: any): void;
    once(eventNames: any): Promise<unknown>;
    events(eventNames: any): {
        next(): Promise<any>;
        return(value: any): Promise<{
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
        next(): Promise<any>;
        return(value: any): Promise<{
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
