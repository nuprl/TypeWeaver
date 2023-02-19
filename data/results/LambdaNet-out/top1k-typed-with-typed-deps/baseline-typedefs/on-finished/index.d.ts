/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var asyncHooks: HTMLElement;
declare var first: Function;
declare var defer: Function;
declare function onFinished(msg: string, listener: string): string;
declare function isFinished(msg: any[]): boolean;
declare function attachFinishedListener(msg: object, callback: Function): void;
declare function attachListener(msg: object, listener: string): void;
declare function createListener(msg: object): object;
declare function patchAssignSocket(res: Map, callback: Function): void;
declare function tryRequireAsyncHooks(): number;
declare function wrap(fn: object): object;
