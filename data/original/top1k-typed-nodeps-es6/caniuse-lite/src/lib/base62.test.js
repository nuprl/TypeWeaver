import { test } from 'uvu';
import { ok } from 'uvu/assert';
import { encode, decode } from './base62';

function testEquality(num) {
  let encoded = encode(num)
  let decoded = decode(encoded)
  return decoded === num
}

test('should encode and decode numbers', () => {
  for (let num = 0; num < 5000; num++) {
    ok(testEquality(num))
  }
})

test.run()
