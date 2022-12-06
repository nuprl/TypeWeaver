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
declare const _default: {
    CloseEvent: typeof CloseEvent;
    ErrorEvent: typeof ErrorEvent;
    Event: typeof Event;
    EventTarget: {
        addEventListener(type: any, listener: any, options?: {}): void;
        removeEventListener(type: any, handler: any): void;
    };
    MessageEvent: typeof MessageEvent;
};
export default _default;
