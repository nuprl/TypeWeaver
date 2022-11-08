import {
  noop,
  reject as _reject
} from '../-internal';

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = new Promise(function(resolve: Function,  reject: Function){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value: any){
    // Code here doesn't run because the promise is rejected!
  }, function(reason: Error){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value: any){
    // Code here doesn't run because the promise is rejected!
  }, function(reason: Error){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @for Promise
  @static
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
export default function reject(reason: any,  label: ?string) {
  /*jshint validthis:true */
  let Constructor = this;
  let promise = new Constructor(noop, label);
  _reject(promise, reason);
  return promise;
}