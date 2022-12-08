declare var has: boolean, prefix: string;
declare function Events(): void;
declare namespace Events {
    var prototype: any;
}
declare function EE(fn: any, context: any, once: boolean): void;
declare function addListener(emitter: any, event: any, fn: any, context: any, once: any): void;
declare function clearEvent(emitter: any, evt: any): void;
declare function EventEmitter(): void;
declare namespace EventEmitter {
    var prefixed: string;
    var EventEmitter: typeof globalThis.EventEmitter;
}
