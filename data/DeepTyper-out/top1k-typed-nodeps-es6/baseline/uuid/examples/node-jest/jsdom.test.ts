/** @jest-environment jsdom */

import uuid from 'uuid';

test('uuidv4()', () => {
  const val: any = uuid.v4();
  expect(uuid.version(val)).toBe(4);
});
