'use strict';

const inherits: Function = require('inherits');

const DEREncoder: Function = require('./der');

function PEMEncoder(entity: String): Void {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
}
inherits(PEMEncoder, DEREncoder);
module.exports = PEMEncoder;

PEMEncoder.prototype.encode = function encode(data: Object, options: Object): String {
  const buf: Array = DEREncoder.prototype.encode.call(this, data);

  const p: String = buf.toString('base64');
  const out: Array = [ '-----BEGIN ' + options.label + '-----' ];
  for (let i = 0; i < p.length; i += 64)
    out.push(p.slice(i, i + 64));
  out.push('-----END ' + options.label + '-----');
  return out.join('\n');
};
