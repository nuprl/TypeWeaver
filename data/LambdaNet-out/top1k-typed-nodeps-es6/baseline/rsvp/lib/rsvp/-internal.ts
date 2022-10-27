import originalThen from './then';
import originalResolve from './promise/resolve';
import instrument from './instrument';

import { config } from './config';
import Promise from './promise';

function withOwnPromise(): Object {
  return new TypeError('A promises callback cannot return that same promise.');
}

function objectOrFunction(x: String): Boolean {
  let type: String = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function noop(): Void {}

export const PENDING: Boolean   = void 0;
export const FULFILLED: Number = 1;
export const REJECTED: Number  = 2;

function tryThen(then: Function, value: String, fulfillmentHandler: Object, rejectionHandler: Object): Void {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch(e) {
    return e;
  }
}
function handleForeignThenable(promise: Promise, thenable: Number, then: String): Void {
  config.async((promise: Promise) => {
    let sealed: Boolean = false;
    let error: Object = tryThen(then,
      thenable,
      (value: String) => {
        if (sealed) { return; }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve(promise, value);
        }
      },
      (reason: String) => {
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

function handleOwnThenable(promise: Promise, thenable: Promise): Void {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    thenable._onError = null;
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, (value: String) => {
      if (thenable === value) {
        fulfill(promise, value);
      } else {
        resolve(promise, value);
      }
    }, (reason: String) => reject(promise, reason));
  }
}

export function handleMaybeThenable(promise: Promise, maybeThenable: Object, then: String): Void {
  let isOwnThenable: Boolean =
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

export function resolve(promise: Promise, value: Array): Void {
  if (promise === value) {
    fulfill(promise, value);
  } else if (objectOrFunction(value)) {
    let then: String;
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

export function publishRejection(promise: Promise): Void {
  if (promise._onError) {
    promise._onError(promise._result);
  }

  publish(promise);
}

export function fulfill(promise: Promise, value: String): Void {
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

export function reject(promise: Promise, reason: Function): Void {
  if (promise._state !== PENDING) { return; }
  promise._state = REJECTED;
  promise._result = reason;
  config.async(publishRejection, promise);
}

export function subscribe(parent: Promise, child: Object, onFulfillment: String, onRejection: String): Void {
  let subscribers: Array = parent._subscribers;
  let length: Number = subscribers.length;

  parent._onError = null;

  subscribers[length] = child;
  subscribers[length + FULFILLED] = onFulfillment;
  subscribers[length + REJECTED]  = onRejection;

  if (length === 0 && parent._state) {
    config.async(publish, parent);
  }
}

export function publish(promise: Promise): Void {
  let subscribers: Array = promise._subscribers;
  let settled: String = promise._state;

  if (config.instrument) {
    instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
  }

  if (subscribers.length === 0) { return; }

  let child: Object, callback: Function, result: Array = promise._result;

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

export function invokeCallback(state: String, promise: Promise, callback: Function, result: Number): Void {
  let hasCallback: Boolean = typeof callback === 'function';
  let value: String, succeeded: Boolean = true, error: Object;

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

export function initializePromise(promise: Promise, resolver: Function): Void {
  let resolved: Boolean = false;
  try {
    resolver((value: String) => {
      if (resolved) { return; }
      resolved = true;
      resolve(promise, value);
    }, (reason: String) => {
      if (resolved) { return; }
      resolved = true;
      reject(promise, reason);
    });
  } catch(e) {
    reject(promise, e);
  }
}
