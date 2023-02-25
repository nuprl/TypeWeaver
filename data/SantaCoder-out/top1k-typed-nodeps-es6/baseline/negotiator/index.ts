/*!
 * negotiator
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

import preferredCharsets from './lib/charset';
import preferredEncodings from './lib/encoding';
import preferredLanguages from './lib/language';
import preferredMediaTypes from './lib/mediaType';

/**
 * Module exports.
 * @public
 */

module.exports = Negotiator;
module.exports.Negotiator = Negotiator;

/**
 * Create a Negotiator instance from a request.
 * @param {object} request
 * @public
 */

function Negotiator(request: any) {
  if (!(this instanceof Negotiator)) {
    return new Negotiator(request);
  }

  this.request = request;
}

Negotiator.prototype.charset = function charset(available: string[]) {
  var set = this.charsets(available);
  return set && set[0];
};

Negotiator.prototype.charsets = function charsets(available: string[]) {
  return preferredCharsets(this.request.headers['accept-charset'], available);
};

Negotiator.prototype.encoding = function encoding(available: string[]) {
  var set = this.encodings(available);
  return set && set[0];
};

Negotiator.prototype.encodings = function encodings(available: Encoding[]) {
  return preferredEncodings(this.request.headers['accept-encoding'], available);
};

Negotiator.prototype.language = function language(available: string[]) {
  var set = this.languages(available);
  return set && set[0];
};

Negotiator.prototype.languages = function languages(available: string[]) {
  return preferredLanguages(this.request.headers['accept-language'], available);
};

Negotiator.prototype.mediaType = function mediaType(available: string[]) {
  var set = this.mediaTypes(available);
  return set && set[0];
};

Negotiator.prototype.mediaTypes = function mediaTypes(available: string[]) {
  return preferredMediaTypes(this.request.headers.accept, available);
};

// Backwards compatibility
Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;