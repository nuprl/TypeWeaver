module.exports = assert;

function assert(val: any, msg: string): void {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l: any, r: string, msg: string): void {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};
