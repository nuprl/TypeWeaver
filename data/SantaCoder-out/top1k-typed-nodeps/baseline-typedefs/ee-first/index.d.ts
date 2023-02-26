/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */
declare function first(stuff: any, done: any): {
    (fn: any): void;
    cancel: () => void;
};
declare function listener(event: 'error', done: any): (arg1: any) => void;
