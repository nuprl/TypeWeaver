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

module.exports = preferredLanguages;
module.exports.preferredLanguages = preferredLanguages;

/**
 * Module variables.
 * @private
 */

var simpleLanguageRegExp: RegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;

/**
 * Parse the Accept-Language header.
 * @private
 */

function parseAcceptLanguage(accept: string): any[] {
  var accepts: any[] = accept.split(',');

  for (var i = 0, j = 0; i < accepts.length; i++) {
    var language: string = parseLanguage(accepts[i].trim(), i);

    if (language) {
      accepts[j++] = language;
    }
  }

  // trim accepts
  accepts.length = j;

  return accepts;
}

/**
 * Parse a language from the Accept-Language header.
 * @private
 */

function parseLanguage(str: string, i: number): object {
  var match: object = simpleLanguageRegExp.exec(str);
  if (!match) return null;

  var prefix: string = match[1]
  var suffix: string = match[2]
  var full: string = prefix

  if (suffix) full += "-" + suffix;

  var q: number = 1;
  if (match[3]) {
    var params: any[] = match[3].split(';')
    for (var j = 0; j < params.length; j++) {
      var p: object = params[j].split('=');
      if (p[0] === 'q') q = parseFloat(p[1]);
    }
  }

  return {
    prefix: prefix,
    suffix: suffix,
    q: q,
    i: i,
    full: full
  };
}

/**
 * Get the priority of a language.
 * @private
 */

function getLanguagePriority(language: string, accepted: any[], index: number): object {
  var priority: object = {o: -1, q: 0, s: 0};

  for (var i = 0; i < accepted.length; i++) {
    var spec: object = specify(language, accepted[i], index);

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec;
    }
  }

  return priority;
}

/**
 * Get the specificity of the language.
 * @private
 */

function specify(language: string, spec: object, index: number): object {
  var p: object = parseLanguage(language)
  if (!p) return null;
  var s: number = 0;
  if(spec.full.toLowerCase() === p.full.toLowerCase()){
    s |= 4;
  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
    s |= 2;
  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
    s |= 1;
  } else if (spec.full !== '*' ) {
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
 * Get the preferred languages from an Accept-Language header.
 * @public
 */

function preferredLanguages(accept: number, provided: any[]): any[] {
  // RFC 2616 sec 14.4: no header = *
  var accepts: any[] = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

  if (!provided) {
    // sorted list of all languages
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullLanguage);
  }

  var priorities: any[] = provided.map(function getPriority(type: string, index: number): string {
    return getLanguagePriority(type, accepts, index);
  });

  // sorted list of accepted languages
  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority: string): string {
    return provided[priorities.indexOf(priority)];
  });
}

/**
 * Compare two specs.
 * @private
 */

function compareSpecs(a: object, b: object): boolean {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
}

/**
 * Get full language string.
 * @private
 */

function getFullLanguage(spec: object): boolean {
  return spec.full;
}

/**
 * Check if a spec has any quality.
 * @private
 */

function isQuality(spec: object): boolean {
  return spec.q > 0;
}
