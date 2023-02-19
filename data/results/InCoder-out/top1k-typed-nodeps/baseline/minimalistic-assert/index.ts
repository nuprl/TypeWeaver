module.exports = assert;

function assert(val: any,  msg: string | Error) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l: umber,  r: mber,  msg: string) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};