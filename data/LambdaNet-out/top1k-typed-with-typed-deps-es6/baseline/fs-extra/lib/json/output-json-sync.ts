'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file: any[], data: object, options: object): Promise {
  const str: string = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;
