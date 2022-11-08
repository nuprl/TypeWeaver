import {
  noop,
  resolve,
  reject,
  subscribe,
  PENDING
} from '../-internal';

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  import Promise from 'rsvp';

  let promise1 = new Promise(function(resolve: Function,  reject: Function){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve: Function,  reject: Function){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result: any){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  import Promise from 'rsvp';

  let promise1 = new Promise(function(resolve: Function,  reject: Function){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve: Function,  reject: Function){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result: IPromise<any>){
    // Code here never runs
  }, function(reason: Error){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  import Promise from 'rsvp';

  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @for Promise
  @static
  @param {Array} entries array of promises to observe
  @param {String} [label] optional string for describing the promise returned.
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
export default function race(entries: Array<[string, number],  label: string) {
  /*jshint validthis:true */
  let Constructor = this;

  let promise = new Constructor(noop, label);

  if (!Array.isArray(entries)) {
    reject(promise, new TypeError('Promise.race must be called with an array'));
    return promise;
  }

  for (let i = 0; promise._state === PENDING && i < entries.length; i++) {
    subscribe(
      Constructor.resolve(entries[i]), undefined,
      value  => resolve(promise, value),
      reason => reject(promise, reason)
    );
  }

  return promise;
}