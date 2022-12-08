'use strict';

import fs from 'fs';
import path from 'path';
import repeat from 'repeat-string';
import isObject from 'isobject';
import text from 'text-table';
var table: any[] = [];

function bench(): void {
  var filepath: string = path.join(__dirname, 'last.md');
  var str: any = fs.readFileSync(filepath, 'utf8');
  var sections: string[] = str.split(/\n(?=\n?(?:# benchmark))/);
  sections.shift();

  var len: number = sections.length;
  var idx: number = -1;
  var res: any[] = [];

  while (++idx < len) {
    parseSection(sections[idx].trim());
  }

  return text(table);
}

function parseSection(str: any): string {
  var lines: string[] = str.split('\n').filter(Boolean);
  lines.pop();

  if (!lines.length) return;
  var heading: string = lines.shift().trim();
  var m: RegExpExecArray = /^.*\/fixtures\/([^(]+)/.exec(heading);

  var title: string = (m ? m[1] : heading).trim();
  var tok: Token = {title: title};
  tok.title = path.basename(title, path.extname(title)) + 'x';

  return createLines(tok, lines);
}

function createLines(tok: string, lines: string[]): void {
  var len: number = lines.length;
  var idx: number = -1;
  while (++idx < len) {
    var line: string = lines[idx];

    var obj: any = parseStats(line);
    tok[obj.name] = obj;
  }

  var vals: any[] = values(tok);
  var max: number = Math.max.apply(Math, vals);

  table.push([], ['# ' + tok.title])
  for (var key in tok) {
    if (tok.hasOwnProperty(key)) {
      if (isObject(tok[key])) {
        table.push(format(tok[key], max, 100));
      }
    }
  }
}

function format(tok: string, max: number, diff: string): string {
  return [tok.name.trim(), bar(tok, max, diff).trim(), '(' + tok.val + ' ops/sec)'];
}

function parseStats(line: string): string {
  var str: string = line.trim();
  var m: RegExpExecArray = /^([^ ]+) x ([\d,.]+)/.exec(str);
  var tok: any = {num: 0, val: ''};
  if (!m) return tok;
  tok.name = m[1];
  tok.val = m[2];
  tok.num = String(tok.val).split(',').join('');
  return tok;
}

function values(obj: any): any[] {
  var vals: any[] = [];
  for (var key in obj) {
    if (key === 'title') continue;
    vals.push(obj[key].num);
  }
  return vals;
}

function bar(tok: string, longest: string): string {
  return repeat('█', (tok.num / longest) * 25);
}

/**
 * Expose `.bench` helper
 */

module.exports.bench = bench;
