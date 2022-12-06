'use strict'

import { stringify } from 'jsonfile/utils';
import { outputFile } from '../output-file';

async function outputJson (file: HTMLElement, data: Element, options: Map = {}): Map {
  const str: string = stringify(data, options)

  await outputFile(file, str, options)
}

export default outputJson;
