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

module.exports = preferredMediaTypes;
module.exports.preferredMediaTypes = preferredMediaTypes;

/**
 * Module variables.
 * @private
 */

var simpleMediaTypeRegExp: RegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;

/**
 * Parse the Accept header.
 * @private
 */

function parseAccept(accept: String): Array {
  var accepts: Array = splitMediaTypes(accept);

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var mediaType: String = parseMediaType(accepts[i].trim(), i);

    if (mediaType) {
      accepts[j++] = mediaType;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a media type from the Accept header.
 * @private
 */

function parseMediaType(str: String, i: Number): Object {
  var match: Object = simpleMediaTypeRegExp.exec(str);
  if (!match) return null;

  var params: Object = Object.create(null);
  var q: Number = 1;
  var subtype: String = match[2];
  var type: String = match[1];

  if (match[3]) {
    var kvps: Array = splitParameters(match[3]).map(splitKeyValuePair);

    for (var j = 0; j < kvps.length; j++) {
      var pair: Object = kvps[j];
      var key: String = pair[0].toLowerCase();
      var val: String = pair[1];

      // get the value, unwrapping quotes
      var value: String = val && val[0] === '"' && val[val.length - 1] === '"'
        ? val.substr(1, val.length - 2)
        : val;

      if (key === 'q') {
        q = parseFloat(value);
        break;
      }

      // store parameter
      params[key] = value;
    }
  }

  return {
    type: type,
    subtype: subtype,
    params: params,
    q: q,
    i: i
  };
}

/**
 * Get the priority of a media type.
 * @private
 */

function getMediaTypePriority(type: String, accepted: Array, index: Number): Object {
  var priority: Object = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec: Object = specify(type, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the media type.
 * @private
 */

function specify(type: String, spec: Object, index: Number): Object {
  var p: Object = parseMediaType(type);
  var s: Number = 0;

  if (!p) {
    return null;
  }

  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
    s |= 4
  } else if(spec.type != '*') {
    return null;
  }

  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
    s |= 2
  } else if(spec.subtype != '*') {
    return null;
  }

  var keys: Array = Object.keys(spec.params);
  if (keys.length > 0) {
    if (keys.every(function (k: String) {
      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
    })) {
      s |= 1
    } else {
      return null
    }
  }

  return {
    i: index,
    o: spec.i,
    q: spec.q,
    s: s,
  }
}

/**
 * Get the preferred media types from an Accept header.
 * @public
 */

function preferredMediaTypes(accept: Number, provided: Array): Array {
  // RFC 2616 sec 14.2: no header = */*
  var accepts: Array = parseAccept(accept === undefined ? '*/*' : accept || '');

  if (!provided) {
    // sorted list of all types
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullType);
  }

  var priorities: Array = provided.map(function getPriority(type: String, index: Number): String {
    return getMediaTypePriority(type, accepts, index);
  });

  // sorted list of accepted types
  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority: String): Object {
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
 * Get full type string.
 * @private
 */

function getFullType(spec: Object): String {
  return spec.type + '/' + spec.subtype;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec: Object): Boolean {
  return spec.q > 0;
}

/**
 * Count the number of quotes in a string.
 * @private
 */

function quoteCount(string: String): Number {
  var count: Number = 0;
  var index: Number = 0;

  while ((index = string.indexOf('"', index)) !== -1) {
    count++;
    index++;
  }

  return count;
}

/**
 * Split a key value pair.
 * @private
 */

function splitKeyValuePair(str: String): Promise {
  var index: Number = str.indexOf('=');
  var key: String;
  var val: String;

  if (index === -1) {
    key = str;
  } else {
    key = str.substr(0, index);
    val = str.substr(index + 1);
  }

  return [key, val];
}

/**
 * Split an Accept header into media types.
 * @private
 */

function splitMediaTypes(accept: String): Object {
  var accepts: Array = accept.split(',');

  for (var i = 1, j = 0; i < accepts.length; i++) {
    if (quoteCount(accepts[j]) % 2 == 0) {
      accepts[++j] = accepts[i];
    } else {
      accepts[j] += ',' + accepts[i];
    }
  }

  // trim accepts
  accepts.length = j + 1;

  return accepts;
}

/**
 * Split a string of parameters.
 * @private
 */

function splitParameters(str: String): Object {
  var parameters: Array = str.split(';');

  for (var i = 1, j = 0; i < parameters.length; i++) {
    if (quoteCount(parameters[j]) % 2 == 0) {
      parameters[++j] = parameters[i];
    } else {
      parameters[j] += ';' + parameters[i];
    }
  }

  // trim parameters
  parameters.length = j + 1;

  for (var i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }

  return parameters;
}
