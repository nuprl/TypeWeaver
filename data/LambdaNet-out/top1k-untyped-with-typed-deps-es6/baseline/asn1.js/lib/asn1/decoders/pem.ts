'use strict';

import inherits from 'inherits';
import { Buffer } from 'safer-buffer';
import DERDecoder from './der';

function PEMDecoder(entity: string): void {
  DERDecoder.call(this, entity);
  this.enc = 'pem';
}
inherits(PEMDecoder, DERDecoder);
export default PEMDecoder;

PEMDecoder.prototype.decode = function decode(data: string, options: object): any[] {
  const lines: any[] = data.toString().split(/[\r\n]+/g);

  const label: string = options.label.toUpperCase();

  const re: RegExp = /^-----(BEGIN|END) ([^-]+)-----$/;
  let start: number = -1;
  let end: number = -1;
  for (let i = 0; i < lines.length; i++) {
    const match: object = lines[i].match(re);
    if (match === null)
      continue;

    if (match[2] !== label)
      continue;

    if (start === -1) {
      if (match[1] !== 'BEGIN')
        break;
      start = i;
    } else {
      if (match[1] !== 'END')
        break;
      end = i;
      break;
    }
  }
  if (start === -1 || end === -1)
    throw new Error('PEM section not found for: ' + label);

  const base64: string = lines.slice(start + 1, end).join('');
  // Remove excessive symbols
  base64.replace(/[^a-z0-9+/=]+/gi, '');

  const input: HTMLElement = Buffer.from(base64, 'base64');
  return DERDecoder.prototype.decode.call(this, input, options);
};
