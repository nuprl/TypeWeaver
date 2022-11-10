import { v4 as uuidv4 } from 'uuid';

import testpage from '../utils/testpage';

testpage(function (addTest: Function,  done: Function) {
  addTest('uuidv4()', uuidv4());
  done();
});