import Promise from './promise';

/**
  This is a convenient alias for `Promise.race`.

  @method race
  @public
  @static
  @for rsvp
  @param {Array} array Array of promises.
  @param {String} [label] An optional label. This is useful
  for tooling.
 */
export default function race(array: PromiseLike<any>,  label: any) {
  return Promise.race(array, label);
}