export default isPromise;
export const default = isPromise;

function isPromise(obj: Promise) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}