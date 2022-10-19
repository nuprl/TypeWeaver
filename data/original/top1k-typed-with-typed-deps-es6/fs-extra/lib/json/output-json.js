'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFile } from '../output-file';

async function outputJson (file, data, options = {}) {
  const str = stringify(data, options)

  await outputFile(file, str, options)
}

export default outputJson;
