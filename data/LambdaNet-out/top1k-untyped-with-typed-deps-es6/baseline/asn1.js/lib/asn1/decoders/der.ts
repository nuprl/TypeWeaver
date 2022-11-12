'use strict';

import inherits from 'inherits';
import bignum from 'bn.js';
import { DecoderBuffer } from '../base/buffer';
import Node from '../base/node';

// Import DER constants
import der from '../constants/der';

function DERDecoder(entity: Object): Void {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
}
export default DERDecoder;

DERDecoder.prototype.decode = function decode(data: Array, options: Function): String {
  if (!DecoderBuffer.isDecoderBuffer(data)) {
    data = new DecoderBuffer(data, options);
  }

  return this.tree._decode(data, options);
};

// Tree methods

function DERNode(parent: String): Void {
  Node.call(this, 'der', parent);
}
inherits(DERNode, Node);

DERNode.prototype._peekTag = function peekTag(buffer: Object, tag: Number, any: Number): Boolean {
  if (buffer.isEmpty())
    return false;

  const state: String = buffer.save();
  const decodedTag: Promise = derDecodeTag(buffer, 'Failed to peek tag: "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  buffer.restore(state);

  return decodedTag.tag === tag || decodedTag.tagStr === tag ||
    (decodedTag.tagStr + 'of') === tag || any;
};

DERNode.prototype._decodeTag = function decodeTag(buffer: Object, tag: Number, any: Boolean): Boolean {
  const decodedTag: Object = derDecodeTag(buffer,
    'Failed to decode tag of "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  let len: Number = derDecodeLen(buffer,
    decodedTag.primitive,
    'Failed to get length of "' + tag + '"');

  // Failure
  if (buffer.isError(len))
    return len;

  if (!any &&
      decodedTag.tag !== tag &&
      decodedTag.tagStr !== tag &&
      decodedTag.tagStr + 'of' !== tag) {
    return buffer.error('Failed to match tag: "' + tag + '"');
  }

  if (decodedTag.primitive || len !== null)
    return buffer.skip(len, 'Failed to match body of: "' + tag + '"');

  // Indefinite length... find END tag
  const state: Object = buffer.save();
  const res: Array = this._skipUntilEnd(
    buffer,
    'Failed to skip indefinite length body: "' + this.tag + '"');
  if (buffer.isError(res))
    return res;

  len = buffer.offset - state.offset;
  buffer.restore(state);
  return buffer.skip(len, 'Failed to match body of: "' + tag + '"');
};

DERNode.prototype._skipUntilEnd = function skipUntilEnd(buffer: Object, fail: String): Array {
  for (;;) {
    const tag: Object = derDecodeTag(buffer, fail);
    if (buffer.isError(tag))
      return tag;
    const len: Number = derDecodeLen(buffer, tag.primitive, fail);
    if (buffer.isError(len))
      return len;

    let res: Object;
    if (tag.primitive || len !== null)
      res = buffer.skip(len);
    else
      res = this._skipUntilEnd(buffer, fail);

    // Failure
    if (buffer.isError(res))
      return res;

    if (tag.tagStr === 'end')
      break;
  }
};

DERNode.prototype._decodeList = function decodeList(buffer: Object, tag: Number, decoder: Object,
  options: Function): Array {
  const result: Array = [];
  while (!buffer.isEmpty()) {
    const possibleEnd: String = this._peekTag(buffer, 'end');
    if (buffer.isError(possibleEnd))
      return possibleEnd;

    const res: String = decoder.decode(buffer, 'der', options);
    if (buffer.isError(res) && possibleEnd)
      break;
    result.push(res);
  }
  return result;
};

DERNode.prototype._decodeStr = function decodeStr(buffer: Object, tag: Number): String {
  if (tag === 'bitstr') {
    const unused: Number = buffer.readUInt8();
    if (buffer.isError(unused))
      return unused;
    return { unused: unused, data: buffer.raw() };
  } else if (tag === 'bmpstr') {
    const raw: Array = buffer.raw();
    if (raw.length % 2 === 1)
      return buffer.error('Decoding of string type: bmpstr length mismatch');

    let str: String = '';
    for (let i = 0; i < raw.length / 2; i++) {
      str += String.fromCharCode(raw.readUInt16BE(i * 2));
    }
    return str;
  } else if (tag === 'numstr') {
    const numstr: String = buffer.raw().toString('ascii');
    if (!this._isNumstr(numstr)) {
      return buffer.error('Decoding of string type: ' +
                          'numstr unsupported characters');
    }
    return numstr;
  } else if (tag === 'octstr') {
    return buffer.raw();
  } else if (tag === 'objDesc') {
    return buffer.raw();
  } else if (tag === 'printstr') {
    const printstr: String = buffer.raw().toString('ascii');
    if (!this._isPrintstr(printstr)) {
      return buffer.error('Decoding of string type: ' +
                          'printstr unsupported characters');
    }
    return printstr;
  } else if (/str$/.test(tag)) {
    return buffer.raw().toString();
  } else {
    return buffer.error('Decoding of string type: ' + tag + ' unsupported');
  }
};

DERNode.prototype._decodeObjid = function decodeObjid(buffer: Object, values: Object, relative: Boolean): Array {
  let result: Array;
  const identifiers: Array = [];
  let ident: Number = 0;
  let subident: Number = 0;
  while (!buffer.isEmpty()) {
    subident = buffer.readUInt8();
    ident <<= 7;
    ident |= subident & 0x7f;
    if ((subident & 0x80) === 0) {
      identifiers.push(ident);
      ident = 0;
    }
  }
  if (subident & 0x80)
    identifiers.push(ident);

  const first: Number = (identifiers[0] / 40) | 0;
  const second: Number = identifiers[0] % 40;

  if (relative)
    result = identifiers;
  else
    result = [first, second].concat(identifiers.slice(1));

  if (values) {
    let tmp: Array = values[result.join(' ')];
    if (tmp === undefined)
      tmp = values[result.join('.')];
    if (tmp !== undefined)
      result = tmp;
  }

  return result;
};

DERNode.prototype._decodeTime = function decodeTime(buffer: Object, tag: Number): Date {
  const str: String = buffer.raw().toString();

  let year: Number;
  let mon: Number;
  let day: Number;
  let hour: Number;
  let min: Number;
  let sec: Number;
  if (tag === 'gentime') {
    year = str.slice(0, 4) | 0;
    mon = str.slice(4, 6) | 0;
    day = str.slice(6, 8) | 0;
    hour = str.slice(8, 10) | 0;
    min = str.slice(10, 12) | 0;
    sec = str.slice(12, 14) | 0;
  } else if (tag === 'utctime') {
    year = str.slice(0, 2) | 0;
    mon = str.slice(2, 4) | 0;
    day = str.slice(4, 6) | 0;
    hour = str.slice(6, 8) | 0;
    min = str.slice(8, 10) | 0;
    sec = str.slice(10, 12) | 0;
    if (year < 70)
      year = 2000 + year;
    else
      year = 1900 + year;
  } else {
    return buffer.error('Decoding ' + tag + ' time is not supported yet');
  }

  return Date.UTC(year, mon - 1, day, hour, min, sec, 0);
};

DERNode.prototype._decodeNull = function decodeNull(): Object {
  return null;
};

DERNode.prototype._decodeBool = function decodeBool(buffer: Object): Boolean {
  const res: Boolean = buffer.readUInt8();
  if (buffer.isError(res))
    return res;
  else
    return res !== 0;
};

DERNode.prototype._decodeInt = function decodeInt(buffer: Object, values: Promise): Array {
  // Bigint, return as it is (assume big endian)
  const raw: Number = buffer.raw();
  let res: String = new bignum(raw);

  if (values)
    res = values[res.toString(10)] || res;

  return res;
};

DERNode.prototype._use = function use(entity: Function, obj: String): Object {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getDecoder('der').tree;
};

// Utility methods

function derDecodeTag(buf: HTMLElement, fail: Number): Number {
  let tag: Number = buf.readUInt8(fail);
  if (buf.isError(tag))
    return tag;

  const cls: String = der.tagClass[tag >> 6];
  const primitive: Number = (tag & 0x20) === 0;

  // Multi-octet tag - load
  if ((tag & 0x1f) === 0x1f) {
    let oct: Number = tag;
    tag = 0;
    while ((oct & 0x80) === 0x80) {
      oct = buf.readUInt8(fail);
      if (buf.isError(oct))
        return oct;

      tag <<= 7;
      tag |= oct & 0x7f;
    }
  } else {
    tag &= 0x1f;
  }
  const tagStr: String = der.tag[tag];

  return {
    cls: cls,
    primitive: primitive,
    tag: tag,
    tagStr: tagStr
  };
}

function derDecodeLen(buf: HTMLElement, primitive: Boolean, fail: String): Number {
  let len: Number = buf.readUInt8(fail);
  if (buf.isError(len))
    return len;

  // Indefinite form
  if (!primitive && len === 0x80)
    return null;

  // Definite form
  if ((len & 0x80) === 0) {
    // Short form
    return len;
  }

  // Long form
  const num: Number = len & 0x7f;
  if (num > 4)
    return buf.error('length octect is too long');

  len = 0;
  for (let i = 0; i < num; i++) {
    len <<= 8;
    const j: Number = buf.readUInt8(fail);
    if (buf.isError(j))
      return j;
    len |= j;
  }

  return len;
}
