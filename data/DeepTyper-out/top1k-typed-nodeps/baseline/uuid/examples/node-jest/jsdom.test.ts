/** @jest-environment jsdom */

const uuid: any = require('uuid');

test('uuidv4()', () => {
  const val: any = uuid.v4();
  expect(uuid.version(val)).toBe(4);
});
