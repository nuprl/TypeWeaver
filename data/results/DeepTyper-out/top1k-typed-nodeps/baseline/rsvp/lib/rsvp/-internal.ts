import originalThen from './then';
import originalResolve from './promise/resolve';
import instrument from './instrument';

import { config } from './config';
import Promise from './promise';

function withOwnPromise(): boolean {
  return new TypeError('A promises callback cannot return that same promise.');
}

function objectOrFunction(x: any): boolean {
  let type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function noop(): void {}

export const PENDING: number   = void 0;
export const FULFILLED: number = 1;
export const REJECTED: false  = 2;

function tryThen(then: any, value: any, fulfillmentHandler: boolean, rejectionHandler: boolean): void {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch(e) {
    return e;
  }
}
function handleForeignThenable(promise: any, thenable: any, then: any): void {
  config.async((promise: any) => {
    let sealed: boolean = false;
    let error: any = tryThen(then,
      thenable,
      (value: any) => {
        if (sealed) { return; }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve(promise, value);
        }
      },
      (reason: any) => {
        if (sealed) { return; }
        sealed = true;

        reject(promise, reason);
      },
      'Settle: ' + (promise._label || ' unknown promise')
    );
    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise: any, thenable: any): void {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    thenable._onError = null;
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, (value: any) => {
      if (thenable === value) {
        fulfill(promise, value);
      } else {
        resolve(promise, value);
      }
    }, (reason: any) => reject(promise, reason));
  }
}

export function handleMaybeThenable(promise: any, maybeThenable: boolean, then: any): void {
  let isOwnThenable: boolean =
    maybeThenable.constructor === promise.constructor &&
    then === originalThen &&
    promise.constructor.resolve === originalResolve;

  if (isOwnThenable) {
    handleOwnThenable(promise, maybeThenable);
  } else if (typeof then === 'function') {
    handleForeignThenable(promise, maybeThenable, then);
  } else {
    fulfill(promise, maybeThenable);
  }
}

export function resolve(promise: any, value: string): void {
  if (promise === value) {
    fulfill(promise, value);
  } else if (objectOrFunction(value)) {
    let then: any;
    try {
      then = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then);
  } else {
    fulfill(promise, value);
  }
}

export function publishRejection(promise: any): void {
  if (promise._onError) {
    promise._onError(promise._result);
  }

  publish(promise);
}

export function fulfill(promise: any, value: any): void {
  if (promise._state !== PENDING) { return; }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length === 0) {
    if (config.instrument) {
      instrument('fulfilled', promise);
    }
  } else {
    config.async(publish, promise);
  }
}

export function reject(promise: any, reason: any): void {
  if (promise._state !== PENDING) { return; }
  promise._state = REJECTED;
  promise._result = reason;
  config.async(publishRejection, promise);
}

export function subscribe(parent: any, child: any, onFulfillment: any, onRejection: boolean): void {
  let subscribers: any = parent._subscribers;
  let length: number = subscribers.length;

  parent._onError = null;

  subscribers[length] = child;
  subscribers[length + FULFILLED] = onFulfillment;
  subscribers[length + REJECTED]  = onRejection;

  if (length === 0 && parent._state) {
    config.async(publish, parent);
  }
}

export function publish(promise: any): void {
  let subscribers: any = promise._subscribers;
  let settled: boolean = promise._state;

  if (config.instrument) {
    instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
  }

  if (subscribers.length === 0) { return; }

  let child: any, callback, result = promise._result;

  for (let i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, result);
    } else {
      callback(result);
    }
  }

  promise._subscribers.length = 0;
}

export function invokeCallback(state: any, promise: any, callback: Function, result: any): void {
  let hasCallback: boolean = typeof callback === 'function';
  let value: any, succeeded = true, error;

  if (hasCallback) {
    try {
      value = callback(result)
    } catch (e) {
      succeeded = false;
      error = e;
    }
  } else {
    value = result;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (value === promise) {
    reject(promise, withOwnPromise());
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (hasCallback) {
    resolve(promise, value);
  } else if (state === FULFILLED) {
    fulfill(promise, value);
  } else if (state === REJECTED) {
    reject(promise, value);
  }
}

export function initializePromise(promise: any, resolver: boolean): void {
  let resolved: boolean = false;
  try {
    resolver((value: any) => {
      if (resolved) { return; }
      resolved = true;
      resolve(promise, value);
    }, (reason: any) => {
      if (resolved) { return; }
      resolved = true;
      reject(promise, reason);
    });
  } catch(e) {
    reject(promise, e);
  }
}
