import uuid from 'uuid';

test('uuidv4()', () => {
  const val = uuid.v4();
  expect(uuid.version(val)).toBe(4);
});
