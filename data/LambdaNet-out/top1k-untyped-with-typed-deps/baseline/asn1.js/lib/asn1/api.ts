'use strict';

const encoders: object = require('./encoders');
const decoders: object = require('./decoders');
const inherits: Function = require('inherits');

const api: RegExp = exports;

api.define = function define(name: string, body: Function): string {
  return new Entity(name, body);
};

function Entity(name: string, body: Function): Void {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
}

Entity.prototype._createNamed = function createNamed(Base: Function): object {
  const name: string = this.name;

  function Generated(entity: string): Void {
    this._initNamed(entity, name);
  }
  inherits(Generated, Base);
  Generated.prototype._initNamed = function _initNamed(entity: string, name: string): Void {
    Base.call(this, entity, name);
  };

  return new Generated(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc: string): object {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data: object, enc: string, options: object): string {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc: string): object {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data: object, enc: string, /* internal */ reporter: string): string {
  return this._getEncoder(enc).encode(data, reporter);
};
