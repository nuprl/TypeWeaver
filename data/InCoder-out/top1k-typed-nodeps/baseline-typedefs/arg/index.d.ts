declare const flagSymbol: unique symbol;
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
    var ArgError: typeof globalThis.ArgError;
}
