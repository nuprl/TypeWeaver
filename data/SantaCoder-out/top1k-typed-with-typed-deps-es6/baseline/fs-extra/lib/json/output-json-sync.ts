'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFileSync } from '../output-file';

function outputJsonSync (file: string, data: any, options: IJsonOptions) {
  const str = stringify(data, options)

  outputFileSync(file, str, options)
}

export default outputJsonSync;