/**
 * negotiator
 * Copyright(c) 2012 Isaac Z. Schlueter
 * Copyright(c) 2014 Federico Romero
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = preferredCharsets;
module.exports.preferredCharsets = preferredCharsets;

/**
 * Module variables.
 * @private
 */

var simpleCharsetRegExp: RegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Charset header.
 * @private
 */

function parseAcceptCharset(accept: String): Array {
  var accepts: Array = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var charset: String = parseCharset(accepts[i].trim(), i);

    if (charset) {
      accepts[j++] = charset;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a charset from the Accept-Charset header.
 * @private
 */

function parseCharset(str: String, i: Number): Object {
  var match: Object = simpleCharsetRegExp.exec(str);
  if (!match) return null;

  var charset: String = match[1];
  var q: Number = 1;
  if (match[2]) {
    var params: Array = match[2].split(';')
    for (var j = 0; j < params.length; j++) {
      var p: Object = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    charset: charset,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a charset.
 * @private
 */

function getCharsetPriority(charset: String, accepted: Array, index: Number): Object {
  var priority: Object = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec: Object = specify(charset, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the charset.
 * @private
 */

function specify(charset: String, spec: Object, index: Number): Object {
  var s: Number = 0;
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1;
  } else if (spec.charset !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @public
 */

function preferredCharsets(accept: Number, provided: Array): Array {
  // RFC 2616 sec 14.2: no header = *
  var accepts: Array = parseAcceptCharset(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset);
  }

  var priorities: Array = provided.map(function getPriority(type: String, index: Number): Promise {
    return getCharsetPriority(type, accepts, index);
  });

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority: String): String {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a: Object, b: Object): Boolean {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full charset string.
 * @private
 */

function getFullCharset(spec: Object): Array {
  return spec.charset;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec: Object): Boolean {
  return spec.q > 0;
}
