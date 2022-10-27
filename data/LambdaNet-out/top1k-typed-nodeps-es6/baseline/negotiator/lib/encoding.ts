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

module.exports = preferredEncodings;
module.exports.preferredEncodings = preferredEncodings;

/**
 * Module variables.
 * @private
 */

var simpleEncodingRegExp: RegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Encoding header.
 * @private
 */

function parseAcceptEncoding(accept: String): Array {
  var accepts: Array = accept.split(',');
  var hasIdentity: Boolean = false;
  var minQuality: Number = 1;

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var encoding: Object = parseEncoding(accepts[i].trim(), i);

    if (encoding) {
      accepts[j++] = encoding;
      hasIdentity = hasIdentity || specify('identity', encoding);
      minQuality = Math.min(minQuality, encoding.q || 1);
    }
  }

  if (!hasIdentity) {
    /*
     * If identity doesn't explicitly appear in the accept-encoding header,
     * it's added to the list of acceptable encoding with the lowest q
     */
    accepts[j++] = {
      encoding: 'identity',
      q: minQuality,
      i: i
    };
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse an encoding from the Accept-Encoding header.
 * @private
 */

function parseEncoding(str: String, i: Number): Object {
  var match: Object = simpleEncodingRegExp.exec(str);
  if (!match) return null;

  var encoding: String = match[1];
  var q: Number = 1;
  if (match[2]) {
    var params: Array = match[2].split(';');
    for (var j = 0; j < params.length; j++) {
      var p: Object = params[j].trim().split('=');
      if (p[0] === 'q') {
        q = parseFloat(p[1]);
        break;
      }
    }
  }

  return {
    encoding: encoding,
    q: q,
    i: i
  };
}

/**
 * Get the priority of an encoding.
 * @private
 */

function getEncodingPriority(encoding: String, accepted: Array, index: Number): Object {
  var priority: Object = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec: Object = specify(encoding, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the encoding.
 * @private
 */

function specify(encoding: String, spec: Object, index: Number): Object {
  var s: Number = 0;
  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
    s |= 1;
  } else if (spec.encoding !== '*' ) {
    return null
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s
  }
};

/**
 * Get the preferred encodings from an Accept-Encoding header.
 * @public
 */

function preferredEncodings(accept: Number, provided: Array): Array {
  var accepts: Array = parseAcceptEncoding(accept || '');

  if (!provided) {
    // sorted list of all encodings
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullEncoding);
  }

  var priorities: Array = provided.map(function getPriority(type: String, index: Number): String {
    return getEncodingPriority(type, accepts, index);
  });

  // sorted list of accepted encodings
  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority: String): Object {
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
 * Get full encoding string.
 * @private
 */

function getFullEncoding(spec: Object): String {
  return spec.encoding;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec: Object): Boolean {
  return spec.q > 0;
}
