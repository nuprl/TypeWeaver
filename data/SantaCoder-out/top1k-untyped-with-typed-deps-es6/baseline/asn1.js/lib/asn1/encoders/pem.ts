'use strict';

import inherits from 'inherits';
import DEREncoder from './der';

function PEMEncoder(entity: any) {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
}
inherits(PEMEncoder, DEREncoder);
export default PEMEncoder;

PEMEncoder.prototype.encode = function encode(data: any, options: PEMEncoderOptions) {
  const buf = DEREncoder.prototype.encode.call(this, data);

  const p = buf.toString('base64');
  const out = [ '-----BEGIN ' + options.label + '-----' ];
  for (let i = 0; i < p.length; i += 64)
    out.push(p.slice(i, i + 64));
  out.push('-----END ' + options.label + '-----');
  return out.join('\n');
};