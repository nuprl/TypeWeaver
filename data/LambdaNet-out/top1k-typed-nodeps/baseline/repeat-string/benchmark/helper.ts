'use strict';

var fs: string = require('fs');
var path: string = require('path');
var repeat: Function = require('repeat-string');
var isObject: Function = require('isobject');
var text: Function = require('text-table');
var table: any[] = [];

function bench(): boolean {
  var filepath: string = path.join(__dirname, 'last.md');
  var str: string = fs.readFileSync(filepath, 'utf8');
  var sections: any[] = str.split(/\n(?=\n?(?:# benchmark))/);
  sections.shift();

  var len: number = sections.length;
  var idx: number = -1;
  var res: any[] = [];

  while (++idx < len) {
    parseSection(sections[idx].trim());
  }

  return text(table);
}

function parseSection(str: string): string {
  var lines: any[] = str.split('\n').filter(Boolean);
  lines.pop();

  if (!lines.length) return;
  var heading: string = lines.shift().trim();
  var m: Promise = /^.*\/fixtures\/([^(]+)/.exec(heading);

  var title: string = (m ? m[1] : heading).trim();
  var tok: object = {title: title};
  tok.title = path.basename(title, path.extname(title)) + 'x';

  return createLines(tok, lines);
}

function createLines(tok: object, lines: any[]): Void {
  var len: number = lines.length;
  var idx: number = -1;
  while (++idx < len) {
    var line: string = lines[idx];

    var obj: HTMLElement = parseStats(line);
    tok[obj.name] = obj;
  }

  var vals: string = values(tok);
  var max: string = Math.max.apply(Math, vals);

  table.push([], ['# ' + tok.title])
  for (var key in tok) {
    if (tok.hasOwnProperty(key)) {
      if (isObject(tok[key])) {
        table.push(format(tok[key], max, 100));
      }
    }
  }
}

function format(tok: HTMLElement, max: string, diff: string): any[] {
  return [tok.name.trim(), bar(tok, max, diff).trim(), '(' + tok.val + ' ops/sec)'];
}

function parseStats(line: string): object {
  var str: string = line.trim();
  var m: object = /^([^ ]+) x ([\d,.]+)/.exec(str);
  var tok: object = {num: 0, val: ''};
  if (!m) return tok;
  tok.name = m[1];
  tok.val = m[2];
  tok.num = String(tok.val).split(',').join('');
  return tok;
}

function values(obj: object): any[] {
  var vals: any[] = [];
  for (var key in obj) {
    if (key === 'title') continue;
    vals.push(obj[key].num);
  }
  return vals;
}

function bar(tok: Promise, longest: number): boolean {
  return repeat('█', (tok.num / longest) * 25);
}

/**
 * Expose `.bench` helper
 */

module.exports.bench = bench;
