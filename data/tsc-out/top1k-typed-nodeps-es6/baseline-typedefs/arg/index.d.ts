export default arg;
declare function arg(opts: any, { argv, permissive, stopAtPositional }?: {
    argv?: string[];
    permissive?: boolean;
    stopAtPositional?: boolean;
}): {
    _: any[];
};
declare namespace arg {
    export function flag(fn: any): any;
    export const COUNT: any;
    export { ArgError };
}
declare class ArgError extends Error {
    constructor(msg: any, code: any);
    code: any;
}
