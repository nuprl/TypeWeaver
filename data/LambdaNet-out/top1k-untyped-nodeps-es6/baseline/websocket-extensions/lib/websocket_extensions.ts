'use strict';

import Parser from './parser';
import Pipeline from './pipeline';

var Extensions: Function = function() {
  this._rsv1 = this._rsv2 = this._rsv3 = null;

  this._byName   = {};
  this._inOrder  = [];
  this._sessions = [];
  this._index    = {};
};

Extensions.MESSAGE_OPCODES = [1, 2];

var instance: Object = {
  add: function(ext: Object) {
    if (typeof ext.name !== 'string') throw new TypeError('extension.name must be a string');
    if (ext.type !== 'permessage') throw new TypeError('extension.type must be "permessage"');

    if (typeof ext.rsv1 !== 'boolean') throw new TypeError('extension.rsv1 must be true or false');
    if (typeof ext.rsv2 !== 'boolean') throw new TypeError('extension.rsv2 must be true or false');
    if (typeof ext.rsv3 !== 'boolean') throw new TypeError('extension.rsv3 must be true or false');

    if (this._byName.hasOwnProperty(ext.name))
      throw new TypeError('An extension with name "' + ext.name + '" is already registered');

    this._byName[ext.name] = ext;
    this._inOrder.push(ext);
  },

  generateOffer: function() {
    var sessions: Array = [],
        offer: Array    = [],
        index: Object    = {};

    this._inOrder.forEach(function(ext: Object) {
      var session: String = ext.createClientSession();
      if (!session) return;

      var record: Array = [ext, session];
      sessions.push(record);
      index[ext.name] = record;

      var offers: Array = session.generateOffer();
      offers = offers ? [].concat(offers) : [];

      offers.forEach(function(off: Number) {
        offer.push(Parser.serializeParams(ext.name, off));
      }, this);
    }, this);

    this._sessions = sessions;
    this._index    = index;

    return offer.length > 0 ? offer.join(', ') : null;
  },

  activate: function(header: String) {
    var responses: Array = Parser.parseHeader(header),
        sessions: Array  = [];

    responses.eachOffer(function(name: String, params: String) {
      var record: Object = this._index[name];

      if (!record)
        throw new Error('Server sent an extension response for unknown extension "' + name + '"');

      var ext: Function      = record[0],
          session: String  = record[1],
          reserved: Object = this._reserved(ext);

      if (reserved)
        throw new Error('Server sent two extension responses that use the RSV' +
                        reserved[0] + ' bit: "' +
                        reserved[1] + '" and "' + ext.name + '"');

      if (session.activate(params) !== true)
        throw new Error('Server sent unacceptable extension parameters: ' +
                        Parser.serializeParams(name, params));

      this._reserve(ext);
      sessions.push(record);
    }, this);

    this._sessions = sessions;
    this._pipeline = new Pipeline(sessions);
  },

  generateResponse: function(header: String) {
    var sessions: Array = [],
        response: Array = [],
        offers: HTMLElement   = Parser.parseHeader(header);

    this._inOrder.forEach(function(ext: Object) {
      var offer: Array = offers.byName(ext.name);
      if (offer.length === 0 || this._reserved(ext)) return;

      var session: String = ext.createServerSession(offer);
      if (!session) return;

      this._reserve(ext);
      sessions.push([ext, session]);
      response.push(Parser.serializeParams(ext.name, session.generateResponse()));
    }, this);

    this._sessions = sessions;
    this._pipeline = new Pipeline(sessions);

    return response.length > 0 ? response.join(', ') : null;
  },

  validFrameRsv: function(frame: HTMLDivElement) {
    var allowed: Object = { rsv1: false, rsv2: false, rsv3: false },
        ext: HTMLElement;

    if (Extensions.MESSAGE_OPCODES.indexOf(frame.opcode) >= 0) {
      for (var i = 0, n = this._sessions.length; i < n; i++) {
        ext = this._sessions[i][0];
        allowed.rsv1 = allowed.rsv1 || ext.rsv1;
        allowed.rsv2 = allowed.rsv2 || ext.rsv2;
        allowed.rsv3 = allowed.rsv3 || ext.rsv3;
      }
    }

    return (allowed.rsv1 || !frame.rsv1) &&
           (allowed.rsv2 || !frame.rsv2) &&
           (allowed.rsv3 || !frame.rsv3);
  },

  processIncomingMessage: function(message: String, callback: Function, context: Function) {
    this._pipeline.processIncomingMessage(message, callback, context);
  },

  processOutgoingMessage: function(message: String, callback: Function, context: Function) {
    this._pipeline.processOutgoingMessage(message, callback, context);
  },

  close: function(callback: Function, context: String) {
    if (!this._pipeline) return callback.call(context);
    this._pipeline.close(callback, context);
  },

  _reserve: function(ext: Object) {
    this._rsv1 = this._rsv1 || (ext.rsv1 && ext.name);
    this._rsv2 = this._rsv2 || (ext.rsv2 && ext.name);
    this._rsv3 = this._rsv3 || (ext.rsv3 && ext.name);
  },

  _reserved: function(ext: HTMLElement) {
    if (this._rsv1 && ext.rsv1) return [1, this._rsv1];
    if (this._rsv2 && ext.rsv2) return [2, this._rsv2];
    if (this._rsv3 && ext.rsv3) return [3, this._rsv3];
    return false;
  }
};

for (var key in instance)
  Extensions.prototype[key] = instance[key];

export default Extensions;