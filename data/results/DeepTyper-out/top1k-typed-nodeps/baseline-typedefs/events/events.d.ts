declare var R: any;
declare var ReflectApply: any;
declare var ReflectOwnKeys: any;
declare function ProcessEmitWarning(warning: string): void;
declare var NumberIsNaN: number;
declare function EventEmitter(): any;
declare namespace EventEmitter {
    var EventEmitter: typeof globalThis.EventEmitter;
    var init: () => void;
    var listenerCount: (emitter: any, type: any) => any;
}
declare var defaultMaxListeners: number;
declare function checkListener(listener: any): void;
declare function _getMaxListeners(that: any): any;
declare function _addListener(target: any, type: any, listener: any, prepend: any): any;
declare function onceWrapper(): void;
declare function _onceWrap(target: any, type: any, listener: any): any;
declare function _listeners(target: any, type: any, unwrap: any): any;
declare function listenerCount(type: any): any;
declare function arrayClone(arr: any, n: number): any;
declare function spliceOne(list: any, index: number): void;
declare function unwrapListeners(arr: any): any;
declare function once(emitter: any, name: string): boolean;
declare function addErrorHandlerIfEventEmitter(emitter: any, handler: any, flags: any): void;
declare function eventTargetAgnosticAddListener(emitter: any, name: any, listener: any, flags: any): void;
