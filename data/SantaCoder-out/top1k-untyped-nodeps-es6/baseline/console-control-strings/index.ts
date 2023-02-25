'use strict'

// These tables borrowed from `ansi`

var prefix = '\x1b['

export const up = function up (num: number) {
  return prefix + (num || '') + 'A'
};

export const down = function down (num: number) {
  return prefix + (num || '') + 'B'
};

export const forward = function forward (num: number) {
  return prefix + (num || '') + 'C'
};

export const back = function back (num: number) {
  return prefix + (num || '') + 'D'
};

export const nextLine = function nextLine (num: number) {
  return prefix + (num || '') + 'E'
};

export const previousLine = function previousLine (num: number) {
  return prefix + (num || '') + 'F'
};

export const horizontalAbsolute = function horizontalAbsolute (num: number) {
  if (num == null) throw new Error('horizontalAboslute requires a column to position to')
  return prefix + num + 'G'
};

export const eraseData = function eraseData () {
  return prefix + 'J'
};

export const eraseLine = function eraseLine () {
  return prefix + 'K'
};

export const goto = function (x: number, y: number) {
  return prefix + y + ';' + x + 'H'
};

export const gotoSOL = function () {
  return '\r'
};

export const beep = function () {
  return '\x07'
};

export const hideCursor = function hideCursor () {
  return prefix + '?25l'
};

export const showCursor = function showCursor () {
  return prefix + '?25h'
};

var colors = {
  reset: 0,
// styles
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
// resets
  stopBold: 22,
  stopItalic: 23,
  stopUnderline: 24,
  stopInverse: 27,
// colors
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  bgWhite: 47,
  bgBlack: 40,
  bgBlue: 44,
  bgCyan: 46,
  bgGreen: 42,
  bgMagenta: 45,
  bgRed: 41,
  bgYellow: 43,

  grey: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,

  bgGrey: 100,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
}

export const color = function color (colorWith: string) {
  if (arguments.length !== 1 || !Array.isArray(colorWith)) {
    colorWith = Array.prototype.slice.call(arguments)
  }
  return prefix + colorWith.map(colorNameToCode).join(';') + 'm'
};

function colorNameToCode (color: string) {
  if (colors[color] != null) return colors[color]
  throw new Error('Unknown color or style name: ' + color)
}