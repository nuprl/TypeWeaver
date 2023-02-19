'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file: string | Buffer,  data: any,  options: any) {
  const str = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;