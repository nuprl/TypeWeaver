'use strict';

import inherits from 'inherits';
import { Buffer } from 'safer-buffer';
import Node from '../base/node';

// Import DER constants
import der from '../constants/der';

function DEREncoder(entity: Object): Void {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
}
export default DEREncoder;

DEREncoder.prototype.encode = function encode(data: Object, reporter: String): String {
  return this.tree._encode(data, reporter).join();
};

// Tree methods

function DERNode(parent: String): Void {
  Node.call(this, 'der', parent);
}
inherits(DERNode, Node);

DERNode.prototype._encodeComposite = function encodeComposite(tag: String,
  primitive: String,
  cls: String,
  content: Array): String {
  const encodedTag: Function = encodeTag(tag, primitive, cls, this.reporter);

  // Short form
  if (content.length < 0x80) {
    const header: Object = Buffer.alloc(2);
    header[0] = encodedTag;
    header[1] = content.length;
    return this._createEncoderBuffer([ header, content ]);
  }

  // Long form
  // Count octets required to store length
  let lenOctets: Number = 1;
  for (let i = content.length; i >= 0x100; i >>= 8)
    lenOctets++;

  const header: Object = Buffer.alloc(1 + 1 + lenOctets);
  header[0] = encodedTag;
  header[1] = 0x80 | lenOctets;

  for (let i = 1 + lenOctets, j = content.length; j > 0; i--, j >>= 8)
    header[i] = j & 0xff;

  return this._createEncoderBuffer([ header, content ]);
};

DERNode.prototype._encodeStr = function encodeStr(str: String, tag: Number): Object {
  if (tag === 'bitstr') {
    return this._createEncoderBuffer([ str.unused | 0, str.data ]);
  } else if (tag === 'bmpstr') {
    const buf: Array = Buffer.alloc(str.length * 2);
    for (let i = 0; i < str.length; i++) {
      buf.writeUInt16BE(str.charCodeAt(i), i * 2);
    }
    return this._createEncoderBuffer(buf);
  } else if (tag === 'numstr') {
    if (!this._isNumstr(str)) {
      return this.reporter.error('Encoding of string type: numstr supports ' +
                                 'only digits and space');
    }
    return this._createEncoderBuffer(str);
  } else if (tag === 'printstr') {
    if (!this._isPrintstr(str)) {
      return this.reporter.error('Encoding of string type: printstr supports ' +
                                 'only latin upper and lower case letters, ' +
                                 'digits, space, apostrophe, left and rigth ' +
                                 'parenthesis, plus sign, comma, hyphen, ' +
                                 'dot, slash, colon, equal sign, ' +
                                 'question mark');
    }
    return this._createEncoderBuffer(str);
  } else if (/str$/.test(tag)) {
    return this._createEncoderBuffer(str);
  } else if (tag === 'objDesc') {
    return this._createEncoderBuffer(str);
  } else {
    return this.reporter.error('Encoding of string type: ' + tag +
                               ' unsupported');
  }
};

DERNode.prototype._encodeObjid = function encodeObjid(id: Array, values: Object, relative: Boolean): Promise {
  if (typeof id === 'string') {
    if (!values)
      return this.reporter.error('string objid given, but no values map found');
    if (!values.hasOwnProperty(id))
      return this.reporter.error('objid not found in values map');
    id = values[id].split(/[\s.]+/g);
    for (let i = 0; i < id.length; i++)
      id[i] |= 0;
  } else if (Array.isArray(id)) {
    id = id.slice();
    for (let i = 0; i < id.length; i++)
      id[i] |= 0;
  }

  if (!Array.isArray(id)) {
    return this.reporter.error('objid() should be either array or string, ' +
                               'got: ' + JSON.stringify(id));
  }

  if (!relative) {
    if (id[1] >= 40)
      return this.reporter.error('Second objid identifier OOB');
    id.splice(0, 2, id[0] * 40 + id[1]);
  }

  // Count number of octets
  let size: Number = 0;
  for (let i = 0; i < id.length; i++) {
    let ident: Number = id[i];
    for (size++; ident >= 0x80; ident >>= 7)
      size++;
  }

  const objid: Array = Buffer.alloc(size);
  let offset: Number = objid.length - 1;
  for (let i = id.length - 1; i >= 0; i--) {
    let ident: Number = id[i];
    objid[offset--] = ident & 0x7f;
    while ((ident >>= 7) > 0)
      objid[offset--] = 0x80 | (ident & 0x7f);
  }

  return this._createEncoderBuffer(objid);
};

function two(num: String): String {
  if (num < 10)
    return '0' + num;
  else
    return num;
}

DERNode.prototype._encodeTime = function encodeTime(time: String, tag: Number): String {
  let str: String;
  const date: HTMLInputElement = new Date(time);

  if (tag === 'gentime') {
    str = [
      two(date.getUTCFullYear()),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else if (tag === 'utctime') {
    str = [
      two(date.getUTCFullYear() % 100),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else {
    this.reporter.error('Encoding ' + tag + ' time is not supported yet');
  }

  return this._encodeStr(str, 'octstr');
};

DERNode.prototype._encodeNull = function encodeNull(): Promise {
  return this._createEncoderBuffer('');
};

DERNode.prototype._encodeInt = function encodeInt(num: String, values: Object): Object {
  if (typeof num === 'string') {
    if (!values)
      return this.reporter.error('String int or enum given, but no values map');
    if (!values.hasOwnProperty(num)) {
      return this.reporter.error('Values map doesn\'t contain: ' +
                                 JSON.stringify(num));
    }
    num = values[num];
  }

  // Bignum, assume big endian
  if (typeof num !== 'number' && !Buffer.isBuffer(num)) {
    const numArray: Array = num.toArray();
    if (!num.sign && numArray[0] & 0x80) {
      numArray.unshift(0);
    }
    num = Buffer.from(numArray);
  }

  if (Buffer.isBuffer(num)) {
    let size: Number = num.length;
    if (num.length === 0)
      size++;

    const out: Object = Buffer.alloc(size);
    num.copy(out);
    if (num.length === 0)
      out[0] = 0;
    return this._createEncoderBuffer(out);
  }

  if (num < 0x80)
    return this._createEncoderBuffer(num);

  if (num < 0x100)
    return this._createEncoderBuffer([0, num]);

  let size: Number = 1;
  for (let i = num; i >= 0x100; i >>= 8)
    size++;

  const out: Array = new Array(size);
  for (let i = out.length - 1; i >= 0; i--) {
    out[i] = num & 0xff;
    num >>= 8;
  }
  if(out[0] & 0x80) {
    out.unshift(0);
  }

  return this._createEncoderBuffer(Buffer.from(out));
};

DERNode.prototype._encodeBool = function encodeBool(value: Boolean): String {
  return this._createEncoderBuffer(value ? 0xff : 0);
};

DERNode.prototype._use = function use(entity: Function, obj: String): Object {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getEncoder('der').tree;
};

DERNode.prototype._skipDefault = function skipDefault(dataBuffer: Array, reporter: String, parent: Function): Boolean {
  const state: Object = this._baseState;
  let i: Number;
  if (state['default'] === null)
    return false;

  const data: String = dataBuffer.join();
  if (state.defaultBuffer === undefined)
    state.defaultBuffer = this._encodeValue(state['default'], reporter, parent).join();

  if (data.length !== state.defaultBuffer.length)
    return false;

  for (i=0; i < data.length; i++)
    if (data[i] !== state.defaultBuffer[i])
      return false;

  return true;
};

// Utility methods

function encodeTag(tag: Number, primitive: Boolean, cls: String, reporter: Object): Number {
  let res: Number;

  if (tag === 'seqof')
    tag = 'seq';
  else if (tag === 'setof')
    tag = 'set';

  if (der.tagByName.hasOwnProperty(tag))
    res = der.tagByName[tag];
  else if (typeof tag === 'number' && (tag | 0) === tag)
    res = tag;
  else
    return reporter.error('Unknown tag: ' + tag);

  if (res >= 0x1f)
    return reporter.error('Multi-octet tag encoding unsupported');

  if (!primitive)
    res |= 0x20;

  res |= (der.tagClassByName[cls || 'universal'] << 6);

  return res;
}
