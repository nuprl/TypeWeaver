export class CloseEvent extends Event {
    constructor(type: string, options?: {
        code?: number;
        reason?: string;
        wasClean?: boolean;
    });
    get code(): number;
    get reason(): string;
    get wasClean(): boolean;
    [kCode]: number;
    [kReason]: string;
    [kWasClean]: boolean;
}
export class ErrorEvent extends Event {
    constructor(type: string, options?: {
        error?: any;
        message?: string;
    });
    get error(): any;
    get message(): string;
    [kError]: any;
    [kMessage]: string;
}
export class Event {
    constructor(type: string);
    get target(): any;
    get type(): string;
    [kTarget]: any;
    [kType]: string;
}
export namespace EventTarget {
    function addEventListener(type: string, listener: Function, options?: {
        once?: boolean;
    }): void;
    function removeEventListener(type: string, handler: Function): void;
}
export class MessageEvent extends Event {
    constructor(type: string, options?: {
        data?: any;
    });
    get data(): any;
    [kData]: any;
}
declare const kCode: unique symbol;
declare const kReason: unique symbol;
declare const kWasClean: unique symbol;
declare const kError: unique symbol;
declare const kMessage: unique symbol;
declare const kTarget: unique symbol;
declare const kType: unique symbol;
declare const kData: unique symbol;
export {};
