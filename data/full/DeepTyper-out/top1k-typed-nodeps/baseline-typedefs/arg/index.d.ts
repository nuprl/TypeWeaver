declare const flagSymbol: symbol;
declare class ArgError extends Error {
    constructor(msg: any, code: any);
}
declare function arg(opts: any, { argv, permissive, stopAtPositional }?: {
    argv?: string[];
    permissive?: boolean;
    stopAtPositional?: boolean;
}): any;
declare namespace arg {
    var flag: (fn: any) => any;
    var COUNT: any;
    var ArgError: typeof globalThis.ArgError;
}
