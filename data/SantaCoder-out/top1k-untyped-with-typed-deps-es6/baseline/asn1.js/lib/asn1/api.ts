'use strict';

import encoders from './encoders';
import decoders from './decoders';
import inherits from 'inherits';

const api = exports;

api.define = function define(name: string, body: Function) {
  return new Entity(name, body);
};

function Entity(name: string, body: EntityBody) {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
}

Entity.prototype._createNamed = function createNamed(Base: any) {
  const name = this.name;

  function Generated(entity: Entity) {
    this._initNamed(entity, name);
  }
  inherits(Generated, Base);
  Generated.prototype._initNamed = function _initNamed(entity: Entity, name: string) {
    Base.call(this, entity, name);
  };

  return new Generated(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc: string) {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data: Uint8Array, enc: string, options: IDecodeOptions) {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc: string) {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data: any, enc: string, /* internal */ reporter: Reporter) {
  return this._getEncoder(enc).encode(data, reporter);
};