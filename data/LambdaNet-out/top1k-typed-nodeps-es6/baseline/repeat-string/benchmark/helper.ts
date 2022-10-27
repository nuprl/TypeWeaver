'use strict';

import fs from 'fs';
import path from 'path';
import repeat from 'repeat-string';
import isObject from 'isobject';
import text from 'text-table';
var table: Array = [];

function bench(): String {
  var filepath: String = path.join(__dirname, 'last.md');
  var str: String = fs.readFileSync(filepath, 'utf8');
  var sections: Array = str.split(/\n(?=\n?(?:# benchmark))/);
  sections.shift();

  var len: Number = sections.length;
  var idx: Number = -1;
  var res: Array = [];

  while (++idx < len) {
    parseSection(sections[idx].trim());
  }

  return text(table);
}

function parseSection(str: String): String {
  var lines: Array = str.split('\n').filter(Boolean);
  lines.pop();

  if (!lines.length) return;
  var heading: String = lines.shift().trim();
  var m: Promise = /^.*\/fixtures\/([^(]+)/.exec(heading);

  var title: String = (m ? m[1] : heading).trim();
  var tok: Object = {title: title};
  tok.title = path.basename(title, path.extname(title)) + 'x';

  return createLines(tok, lines);
}

function createLines(tok: Object, lines: Array): Void {
  var len: Number = lines.length;
  var idx: Number = -1;
  while (++idx < len) {
    var line: String = lines[idx];

    var obj: HTMLElement = parseStats(line);
    tok[obj.name] = obj;
  }

  var vals: String = values(tok);
  var max: String = Math.max.apply(Math, vals);

  table.push([], ['# ' + tok.title])
  for (var key in tok) {
    if (tok.hasOwnProperty(key)) {
      if (isObject(tok[key])) {
        table.push(format(tok[key], max, 100));
      }
    }
  }
}

function format(tok: HTMLElement, max: String, diff: String): Array {
  return [tok.name.trim(), bar(tok, max, diff).trim(), '(' + tok.val + ' ops/sec)'];
}

function parseStats(line: String): Object {
  var str: String = line.trim();
  var m: Object = /^([^ ]+) x ([\d,.]+)/.exec(str);
  var tok: Object = {num: 0, val: ''};
  if (!m) return tok;
  tok.name = m[1];
  tok.val = m[2];
  tok.num = String(tok.val).split(',').join('');
  return tok;
}

function values(obj: Object): Array {
  var vals: Array = [];
  for (var key in obj) {
    if (key === 'title') continue;
    vals.push(obj[key].num);
  }
  return vals;
}

function bar(tok: Promise, longest: Number): String {
  return repeat('█', (tok.num / longest) * 25);
}

/**
 * Expose `.bench` helper
 */

module.exports.bench = bench;
