'use strict';

import encoders from './encoders';
import decoders from './decoders';
import inherits from 'inherits';

const api: any = exports;

api.define = function define(name: string, body: any): any {
  return new Entity(name, body);
};

function Entity(name: string, body: any): any {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
}

Entity.prototype._createNamed = function createNamed(Base: any): void {
  const name: any = this.name;

  function Generated(entity: any): Function {
    this._initNamed(entity, name);
  }
  inherits(Generated, Base);
  Generated.prototype._initNamed = function _initNamed(entity: any, name: string): void {
    Base.call(this, entity, name);
  };

  return new Generated(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc: any): void {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data: any, enc: any, options: any): any {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc: any): any {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data: any, enc: any, /* internal */ reporter: TelemetryReporter): any {
  return this._getEncoder(enc).encode(data, reporter);
};
