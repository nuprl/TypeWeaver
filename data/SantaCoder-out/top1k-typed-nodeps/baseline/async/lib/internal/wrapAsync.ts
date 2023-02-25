import asyncify from '../asyncify.js'

function isAsync(fn: Function) {
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}

function isAsyncGenerator(fn: Function) {
    return fn[Symbol.toStringTag] === 'AsyncGenerator';
}

function isAsyncIterable(obj: any) {
    return typeof obj[Symbol.asyncIterator] === 'function';
}

function wrapAsync(asyncFn: AsyncFunction) {
    if (typeof asyncFn !== 'function') throw new Error('expected a function')
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

export default wrapAsync;

export { isAsync, isAsyncGenerator, isAsyncIterable };