'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file: string, data: string, options: any): void {
  const str: string = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;
