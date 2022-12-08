declare var has: Function, prefix: number;
declare function Events(): void;
declare namespace Events {
    var prototype: any;
}
declare function EE(fn: string, context: Function, once: string): void;
declare function addListener(emitter: object, event: number, fn: string, context: string, once: number): string;
declare function clearEvent(emitter: object, evt: string): void;
declare function EventEmitter(): void;
declare namespace EventEmitter {
    var prefixed: number;
    var EventEmitter: typeof globalThis.EventEmitter;
}
