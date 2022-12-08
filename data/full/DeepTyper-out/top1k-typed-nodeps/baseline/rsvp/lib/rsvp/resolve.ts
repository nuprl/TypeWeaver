import Promise from './promise';

/**
  This is a convenient alias for `Promise.resolve`.

  @method resolve
  @public
  @static
  @for rsvp
  @param {*} value value that the returned promise will be resolved with
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
export default function resolve(value: string, label: string): any {
  return Promise.resolve(value, label);
}
