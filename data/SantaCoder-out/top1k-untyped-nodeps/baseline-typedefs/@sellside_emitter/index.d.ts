declare class Emitter {
    listeners(event: any): any;
    on(event: any, fn: any): this;
    once(event: any, fn: any): this;
    only(event: any, options: any, fn: any): this;
    off(event: any, fn: any): this;
    emit(event: any): this;
    has(event: any): boolean;
}
declare function removeListeners(fn: Function, listeners: Array<Function>): any;
declare function mixin(target: any): any;
declare function copy(target: Object, provider: Object, keys: string[]): void;
declare function define(obj: any, key: string, val: any): void;
