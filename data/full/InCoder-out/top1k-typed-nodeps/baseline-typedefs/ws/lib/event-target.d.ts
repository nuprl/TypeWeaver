declare const kForOnEventAttribute: any, kListener: any;
declare const kCode: unique symbol;
declare const kData: unique symbol;
declare const kError: unique symbol;
declare const kMessage: unique symbol;
declare const kReason: unique symbol;
declare const kTarget: unique symbol;
declare const kType: unique symbol;
declare const kWasClean: unique symbol;
declare class Event {
    constructor(type: any);
    get target(): any;
    get type(): any;
}
declare class CloseEvent extends Event {
    constructor(type: any, options?: {});
    get code(): any;
    get reason(): any;
    get wasClean(): any;
}
declare class ErrorEvent extends Event {
    constructor(type: any, options?: {});
    get error(): any;
    get message(): any;
}
declare class MessageEvent extends Event {
    constructor(type: any, options?: {});
    get data(): any;
}
declare const EventTarget: {
    addEventListener(type: any, listener: any, options?: {}): void;
    removeEventListener(type: any, handler: any): void;
};
