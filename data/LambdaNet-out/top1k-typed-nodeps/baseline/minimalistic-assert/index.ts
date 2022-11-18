module.exports = assert;

function assert(val: boolean, msg: number): Void {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l: number, r: number, msg: number): Void {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};
