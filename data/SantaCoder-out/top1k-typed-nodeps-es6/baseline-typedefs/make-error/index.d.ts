declare var construct: typeof Reflect.construct;
declare var defineProperty: <T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>) => T;
declare var captureStackTrace: (targetObject: object, constructorOpt?: Function) => void;
declare function BaseError(message: string): void;
declare namespace BaseError {
    var prototype: any;
}
declare var setFunctionName: (fn: string, name: string) => string;
declare function makeError(constructor: Function, super_: any): Function;
