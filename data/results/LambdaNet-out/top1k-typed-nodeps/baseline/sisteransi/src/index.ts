'use strict';

const ESC: string = '\x1B';
const CSI: string = `${ESC}[`;
const beep: string = '\u0007';

const cursor: object = {
  to(x, y) {
    if (!y) return `${CSI}${x + 1}G`;
    return `${CSI}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${CSI}${-x}D`;
    else if (x > 0) ret += `${CSI}${x}C`;

    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;

    return ret;
  },
  up: (count: string = 1) => `${CSI}${count}A`,
  down: (count: string = 1) => `${CSI}${count}B`,
  forward: (count: string = 1) => `${CSI}${count}C`,
  backward: (count: string = 1) => `${CSI}${count}D`,
  nextLine: (count: string = 1) => `${CSI}E`.repeat(count),
  prevLine: (count: string = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
}

const scroll: object = {
  up: (count: string = 1) => `${CSI}S`.repeat(count),
  down: (count: string = 1) => `${CSI}T`.repeat(count)
}

const erase: object = {
  screen: `${CSI}2J`,
  up: (count: string = 1) => `${CSI}1J`.repeat(count),
  down: (count: string = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? cursor.up() : '');
    if (count)
      clear += cursor.left;
    return clear;
  }
}

const clear: object = {
  screen: `${ESC}c`
}

module.exports = { cursor, scroll, erase, beep, clear };
