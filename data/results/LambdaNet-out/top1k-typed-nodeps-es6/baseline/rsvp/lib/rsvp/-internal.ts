import originalThen from './then';
import originalResolve from './promise/resolve';
import instrument from './instrument';

import { config } from './config';
import Promise from './promise';

function withOwnPromise(): object {
  return new TypeError('A promises callback cannot return that same promise.');
}

function objectOrFunction(x: string): boolean {
  let type: string = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function noop(): void {}

export const PENDING: boolean   = void 0;
export const FULFILLED: number = 1;
export const REJECTED: number  = 2;

function tryThen(then: Function, value: string, fulfillmentHandler: object, rejectionHandler: object): void {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch(e) {
    return e;
  }
}
function handleForeignThenable(promise: Promise, thenable: number, then: string): void {
  config.async((promise: Promise) => {
    let sealed: boolean = false;
    let error: object = tryThen(then,
      thenable,
      (value: string) => {
        if (sealed) { return; }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve(promise, value);
        }
      },
      (reason: string) => {
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

function handleOwnThenable(promise: Promise, thenable: Promise): void {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    thenable._onError = null;
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, (value: string) => {
      if (thenable === value) {
        fulfill(promise, value);
      } else {
        resolve(promise, value);
      }
    }, (reason: string) => reject(promise, reason));
  }
}

export function handleMaybeThenable(promise: Promise, maybeThenable: object, then: string): void {
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

export function resolve(promise: Promise, value: any[]): void {
  if (promise === value) {
    fulfill(promise, value);
  } else if (objectOrFunction(value)) {
    let then: string;
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

export function publishRejection(promise: Promise): void {
  if (promise._onError) {
    promise._onError(promise._result);
  }

  publish(promise);
}

export function fulfill(promise: Promise, value: string): void {
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

export function reject(promise: Promise, reason: Function): void {
  if (promise._state !== PENDING) { return; }
  promise._state = REJECTED;
  promise._result = reason;
  config.async(publishRejection, promise);
}

export function subscribe(parent: Promise, child: object, onFulfillment: string, onRejection: string): void {
  let subscribers: any[] = parent._subscribers;
  let length: number = subscribers.length;

  parent._onError = null;

  subscribers[length] = child;
  subscribers[length + FULFILLED] = onFulfillment;
  subscribers[length + REJECTED]  = onRejection;

  if (length === 0 && parent._state) {
    config.async(publish, parent);
  }
}

export function publish(promise: Promise): void {
  let subscribers: any[] = promise._subscribers;
  let settled: string = promise._state;

  if (config.instrument) {
    instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
  }

  if (subscribers.length === 0) { return; }

  let child: object, callback: Function, result: any[] = promise._result;

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

export function invokeCallback(state: string, promise: Promise, callback: Function, result: number): void {
  let hasCallback: boolean = typeof callback === 'function';
  let value: string, succeeded: boolean = true, error: object;

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

export function initializePromise(promise: Promise, resolver: Function): void {
  let resolved: boolean = false;
  try {
    resolver((value: string) => {
      if (resolved) { return; }
      resolved = true;
      resolve(promise, value);
    }, (reason: string) => {
      if (resolved) { return; }
      resolved = true;
      reject(promise, reason);
    });
  } catch(e) {
    reject(promise, e);
  }
}
