import assert from 'assert';
import boolbase from './';

assert.strictEqual(boolbase.trueFunc(), true, "should evaluate to true");
assert.strictEqual(boolbase.falseFunc(), false, "should evaluate to false");
