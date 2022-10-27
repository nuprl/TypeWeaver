module.exports = isPromise;
module.exports.default = isPromise;

function isPromise(obj: Array): Boolean {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
