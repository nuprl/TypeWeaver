/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
export default first;
declare function first(stuff: any[], done: any): {
    (fn: any): void;
    cancel: () => void;
};
