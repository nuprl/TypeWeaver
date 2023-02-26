/// <reference types="node" />
declare class ArgError extends Error {
    constructor(msg: any, code: any);
}
declare function arg(opts: any, { argv, permissive, stopAtPositional }?: {
    argv?: string[];
    permissive?: boolean;
    stopAtPositional?: boolean;
}): {
    _: any[];
};
declare namespace arg {
    var flag: (fn: any) => any;
    var COUNT: any;
    var ArgError: {
        new (msg: any, code: any): ArgError;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
}
export default arg;
