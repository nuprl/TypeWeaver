module.exports = isPromise;
module.exports.default = isPromise;

function isPromise(obj: any) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}