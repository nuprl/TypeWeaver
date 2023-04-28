/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
declare function first(stuff: any, done: Function): {
    (fn: Function): void;
    cancel: () => void;
};
declare function listener(event: any, done: any): (arg1: any) => void;
