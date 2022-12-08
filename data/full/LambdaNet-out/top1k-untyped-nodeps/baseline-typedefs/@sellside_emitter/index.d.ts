declare class Emitter {
    listeners(event: any): any;
    on(event: any, fn: any): this;
    once(event: any, fn: any): this;
    only(event: any, options: any, fn: any): this;
    off(event: any, fn: any): this;
    emit(event: any): this;
    has(event: any): boolean;
}
declare function removeListeners(fn: string, listeners: any[]): Emitter;
declare function mixin(target: object): string;
declare function copy(target: object, provider: object, keys: any[]): void;
declare function define(obj: string, key: string, val: string): void;
