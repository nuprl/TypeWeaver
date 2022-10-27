'use strict';

const ESC: String = '\x1B';
const CSI: String = `${ESC}[`;
const beep: String = '\u0007';

const cursor: Object = {
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
  up: (count: String = 1) => `${CSI}${count}A`,
  down: (count: String = 1) => `${CSI}${count}B`,
  forward: (count: String = 1) => `${CSI}${count}C`,
  backward: (count: String = 1) => `${CSI}${count}D`,
  nextLine: (count: String = 1) => `${CSI}E`.repeat(count),
  prevLine: (count: String = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
}

const scroll: Object = {
  up: (count: String = 1) => `${CSI}S`.repeat(count),
  down: (count: String = 1) => `${CSI}T`.repeat(count)
}

const erase: Object = {
  screen: `${CSI}2J`,
  up: (count: String = 1) => `${CSI}1J`.repeat(count),
  down: (count: String = 1) => `${CSI}J`.repeat(count),
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

const clear: Object = {
  screen: `${ESC}c`
}

export default { cursor, scroll, erase, beep, clear };
