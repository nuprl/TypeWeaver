'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFile } from '../output-file';

async function outputJson (file: string | Buffer,  data: any,  options = {}: OutputJsonOptions) {
  const str = stringify(data, options)

  await outputFile(file, str, options)
}

export default outputJson;