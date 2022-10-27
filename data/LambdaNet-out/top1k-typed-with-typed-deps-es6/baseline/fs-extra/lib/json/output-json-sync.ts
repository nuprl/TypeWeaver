'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file: Array, data: Object, options: Object): Promise {
  const str: String = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;
