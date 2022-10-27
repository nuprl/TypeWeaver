'use strict';

const encoders: Object = require('./encoders');
const decoders: Object = require('./decoders');
const inherits: Function = require('inherits');

const api: RegExp = exports;

api.define = function define(name: String, body: Function): String {
  return new Entity(name, body);
};

function Entity(name: String, body: Function): Void {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
}

Entity.prototype._createNamed = function createNamed(Base: Function): Object {
  const name: String = this.name;

  function Generated(entity: String): Void {
    this._initNamed(entity, name);
  }
  inherits(Generated, Base);
  Generated.prototype._initNamed = function _initNamed(entity: String, name: String): Void {
    Base.call(this, entity, name);
  };

  return new Generated(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc: String): Object {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data: Object, enc: Function, options: Object): String {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc: String): Object {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data: Object, enc: Function, /* internal */ reporter: String): String {
  return this._getEncoder(enc).encode(data, reporter);
};
