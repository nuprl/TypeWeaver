export default assert;

function assert(val: Boolean, msg: String): Void {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l: Number, r: Number, msg: Number): Void {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};
