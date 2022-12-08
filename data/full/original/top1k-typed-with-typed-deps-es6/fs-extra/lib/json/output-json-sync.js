'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file, data, options) {
  const str = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;
