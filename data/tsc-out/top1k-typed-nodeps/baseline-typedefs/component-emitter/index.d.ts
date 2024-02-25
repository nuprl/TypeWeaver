export = Emitter;
declare function Emitter(obj: any): any;
declare class Emitter {
    constructor(obj: any);
    on: (event: string, fn: Function) => Emitter;
    addEventListener(event: string, fn: Function): Emitter;
    _callbacks: any;
    once(event: string, fn: Function): Emitter;
    off: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeListener: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeAllListeners: (event: string, fn: Function, ...args: any[]) => Emitter;
    removeEventListener(event: string, fn: Function, ...args: any[]): Emitter;
    emit(event: string, ...args: any[]): Emitter;
    listeners(event: string): any[];
    hasListeners(event: string): boolean;
}
