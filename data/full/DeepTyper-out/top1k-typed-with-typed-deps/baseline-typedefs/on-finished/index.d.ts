/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var asyncHooks: any;
declare var first: any;
declare var defer: any;
declare function onFinished(msg: any, listener: any): any;
declare function isFinished(msg: any): any;
declare function attachFinishedListener(msg: any, callback: any): void;
declare function attachListener(msg: any, listener: any): void;
declare function createListener(msg: any): any;
declare function patchAssignSocket(res: any, callback: any): any;
declare function tryRequireAsyncHooks(): any;
declare function wrap(fn: any): any;
