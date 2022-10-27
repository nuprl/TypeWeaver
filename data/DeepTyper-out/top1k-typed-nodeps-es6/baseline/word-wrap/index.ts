/*!
 * word-wrap <https://github.com/jonschlinkert/word-wrap>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

export default function(str: any, options): any {
  options = options || {};
  if (str == null) {
    return str;
  }

  var width: number = options.width || 50;
  var indent: string = (typeof options.indent === 'string')
    ? options.indent
    : '';

  var newline: string = options.newline || '\n' + indent;
  var escape: string = typeof options.escape === 'function'
    ? options.escape
    : identity;

  var regexString: string = '.{1,' + width + '}';
  if (options.cut !== true) {
    regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)';
  }

  var re: RegExp = new RegExp(regexString, 'g');
  var lines: any = str.match(re) || [];
  var result: string = indent + lines.map(function(line: string) {
    if (line.slice(-1) === '\n') {
      line = line.slice(0, line.length - 1);
    }
    return escape(line);
  }).join(newline);

  if (options.trim === true) {
    result = result.replace(/[ \t]*$/gm, '');
  }
  return result;
};

function identity(str: string): string {
  return str;
}
