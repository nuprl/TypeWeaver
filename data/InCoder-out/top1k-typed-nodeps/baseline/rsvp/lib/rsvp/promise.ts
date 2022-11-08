import { config } from './config';
import instrument from './instrument';
import then from './then';

import {
  noop,
  initializePromise
} from './-internal';

import all from './promise/all';
import race from './promise/race';
import Resolve from './promise/resolve';
import Reject from './promise/reject';

const guidKey = 'rsvp_' + Date.now() + '-';
let counter = 0;

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise’s eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve: Function,  reject: Function) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value: any) {
    // on fulfillment
  }, function(reason: Error) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url: string | URL) {
    return new Promise(function(resolve: Function,  reject: Function){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json: Object) {
    // on fulfillment
  }, function(reason: Error) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values: any){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @public
  @param {function} resolver
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @constructor
*/
class Promise {
  constructor(resolver, label) {
    this._id = counter++;
    this._label = label;
    this._state = undefined;
    this._result = undefined;
    this._subscribers = [];

    config.instrument && instrument('created', this);

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  _onError(reason) {
    config.after(() => {
      if (this._onError) {
        config.trigger('error', reason, this._label);
      }
    });
  }

/**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.

  ```js
  function findAuthor(){
    throw new Error('couldn\'t find that author');
  }

  // synchronous
  try {
    findAuthor();
  } catch(reason) {
    // something went wrong
  }

  // async with promises
  findAuthor().catch(function(reason: Error){
    // something went wrong
  });
  ```

  @method catch
  @param {Function} onRejection
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise}
*/
  catch(onRejection, label) {
    return this.then(undefined, onRejection, label);
  }

/**
  `finally` will be invoked regardless of the promise's fate just as native
  try/catch/finally behaves

  Synchronous example:

  ```js
  findAuthor() {
    if (Math.random() > 0.5) {
      throw new Error();
    }
    return new Author();
  }

  try {
    return findAuthor(); // succeed or fail
  } catch(error) {
    return findOtherAuthor();
  } finally {
    // always runs
    // doesn't affect the return value
  }
  ```

  Asynchronous example:

  ```js
  findAuthor().catch(function(reason: Error){
    return findOtherAuthor();
  }).finally(function(){
    // author was either found, or not
  });
  ```

  @method finally
  @param {Function} callback
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise}
*/
  finally(callback, label) {
    let promise = this;
    let constructor = promise.constructor;

    if (typeof callback === 'function') {
      return promise.then(value => constructor.resolve(callback()).then(() => value),
                         reason => constructor.resolve(callback()).then(() => { throw reason; }));
    }

    return promise.then(callback, callback);
  }
}

Promise.cast = Resolve; // deprecated
Promise.all = all;
Promise.race = race;
Promise.resolve = Resolve;
Promise.reject = Reject;

Promise.prototype._guidKey = guidKey;

/**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.

  ```js
  findUser().then(function(user: User){
    // user is available
  }, function(reason: Error){
    // user is unavailable, and you are given the reason why
  });
  ```

  Chaining
  --------

  The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.

  ```js
  findUser().then(function (user: User) {
    return user.name;
  }, function (reason: Error) {
    return 'default name';
  }).then(function (userName: String) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });

  findUser().then(function (user: User) {
    throw new Error('Found user, but still unhappy');
  }, function (reason: Error) {
    throw new Error('`findUser` rejected and we\'re unhappy');
  }).then(function (value: any) {
    // never reached
  }, function (reason: Error) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

  ```js
  findUser().then(function (user: User) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value: any) {
    // never reached
  }).then(function (value: any) {
    // never reached
  }, function (reason: Error) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```

  Assimilation
  ------------

  Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.

  ```js
  findUser().then(function (user: User) {
    return findCommentsByAuthor(user);
  }).then(function (comments: Comment[]) {
    // The user's comments are now available
  });
  ```

  If the assimliated promise rejects, then the downstream promise will also reject.

  ```js
  findUser().then(function (user: User) {
    return findCommentsByAuthor(user);
  }).then(function (comments: Comment[]) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason: Error) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```

  Simple Example
  --------------

  Synchronous Example

  ```javascript
  let result;

  try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```

  Errback Example

  ```js
  findResult(function(result: any,  err: Error){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```

  Promise Example;

  ```javascript
  findResult().then(function(result: any){
    // success
  }, function(reason: Error){
    // failure
  });
  ```

  Advanced Example
  --------------

  Synchronous Example

  ```javascript
  let author, books;

  try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```

  Errback Example

  ```js

  function foundBooks(books: Array<Book>) {

  }

  function failure(reason: Error) {

  }

  findAuthor(function(author: String,  err: Error){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books: any[],  err: any) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```

  Promise Example;

  ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books: any){
      // found books
  }).catch(function(reason: Error){
    // something went wrong
  });
  ```

  @method then
  @param {Function} onFulfillment
  @param {Function} onRejection
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise}
*/
Promise.prototype.then = then;

export default Promise;