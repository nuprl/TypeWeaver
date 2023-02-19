export default isPromise;
export const default = isPromise;

function isPromise(obj: any): boolean {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
