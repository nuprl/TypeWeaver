declare var construct: Function;
declare var defineProperty: Function;
declare var captureStackTrace: object;
declare function BaseError(message: string): void;
declare namespace BaseError {
    var prototype: any;
}
declare var setFunctionName: Function;
declare function makeError(constructor: object, super_: Function): object;
