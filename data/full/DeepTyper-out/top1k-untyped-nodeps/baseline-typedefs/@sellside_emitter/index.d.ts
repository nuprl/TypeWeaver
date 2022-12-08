declare class Emitter {
    listeners(event: any): any;
    on(event: any, fn: any): this;
    once(event: any, fn: any): this;
    only(event: any, options: any, fn: any): this;
    off(event: any, fn: any): this;
    emit(event: any): this;
    has(event: any): boolean;
}
declare function removeListeners(fn: any, listeners: any): void;
declare function mixin(target: any): any;
declare function copy(target: any, provider: any, keys: any): void;
declare function define(obj: any, key: string, val: any): void;
