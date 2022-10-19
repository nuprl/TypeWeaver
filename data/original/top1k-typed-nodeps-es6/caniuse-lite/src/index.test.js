import { test } from 'uvu';
import { type } from 'uvu/assert';
import lite from '../dist/unpacker/index';

test('should have the appropriate keys', () => {
  type(lite.agents, 'object')
  type(lite.feature, 'function')
  type(lite.features, 'object')
  type(lite.region, 'function')
})

test.run()
