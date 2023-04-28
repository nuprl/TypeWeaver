declare var Promise: PromiseConstructor;
declare var TRUE: Promise<unknown>;
declare var FALSE: Promise<unknown>;
declare var NULL: Promise<unknown>;
declare var UNDEFINED: Promise<unknown>;
declare var ZERO: Promise<unknown>;
declare var EMPTYSTRING: Promise<unknown>;
declare function valuePromise(value: any): Promise<unknown>;
declare var iterableToArray: (iterable: Iterable<T>) => any;
declare function onSettledFulfill(value: any): {
    status: string;
    value: any;
};
declare function onSettledReject(reason: any): {
    status: string;
    reason: any;
};
declare function mapAllSettled(item: any): {
    status: string;
    value: any;
} | Promise<{
    status: string;
    value: any;
} | {
    status: string;
    reason: any;
}>;
