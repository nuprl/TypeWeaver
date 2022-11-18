'use strict';

const inherits: Function = require('inherits');

const DEREncoder: Function = require('./der');

function PEMEncoder(entity: string): Void {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
}
inherits(PEMEncoder, DEREncoder);
module.exports = PEMEncoder;

PEMEncoder.prototype.encode = function encode(data: object, options: object): string {
  const buf: any[] = DEREncoder.prototype.encode.call(this, data);

  const p: string = buf.toString('base64');
  const out: any[] = [ '-----BEGIN ' + options.label + '-----' ];
  for (let i = 0; i < p.length; i += 64)
    out.push(p.slice(i, i + 64));
  out.push('-----END ' + options.label + '-----');
  return out.join('\n');
};
