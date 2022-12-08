/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var asyncHooks: any;
declare var first: any;
declare var defer: (fn: Function) => void;
declare function onFinished(msg: any, listener: Function): any;
declare function isFinished(msg: any): boolean;
declare function attachFinishedListener(msg: any, callback: Function): void;
declare function attachListener(msg: any, listener: Function): void;
declare function createListener(msg: any): {
    (err: Error): void;
    queue: any[];
};
declare function patchAssignSocket(res: any, callback: Function): void;
declare function tryRequireAsyncHooks(): any;
declare function wrap(fn: Function): any;
