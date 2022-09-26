'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tty = require('tty');
var process = require('process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var tty__namespace = /*#__PURE__*/_interopNamespace(tty);
var process__default = /*#__PURE__*/_interopDefaultLegacy(process);

const env = process__default["default"].env || {};

const isDisabled = "NO_COLOR" in env;
const isForced = "FORCE_COLOR" in env;
const isWindows = process__default["default"].platform === "win32";

const isCompatibleTerminal =
  tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && env.TERM !== "dumb";

const isCI =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);

const isColorSupported =
  !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI);

const raw =
  (open, close, searchRegex, replaceValue) =>
  (s = "") =>
    s === ""
      ? s
      : open +
        (~(s += "").indexOf(close, 4) // skip opening \x1b[
          ? s.replace(searchRegex, replaceValue)
          : s) +
        close;

const init = (open, close) =>
  raw(
    `\x1b[${open}m`,
    `\x1b[${close}m`,
    new RegExp(`\\x1b\\[${close}m`, "g"),
    `\x1b[${open}m`
  );

const colors = {
  reset: init(0, 0),
  bold: raw("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m"),
  dim: raw("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49),
};

const none = (any) => any;

const createColors = ({ useColor = isColorSupported } = {}) => ({
  ...Object.entries(colors).reduce(
    (colorMap, [key, color]) => ({
      ...colorMap,
      [key]: useColor ? color : none,
    }),
    {}
  ),
});

const {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = createColors();

exports.bgBlack = bgBlack;
exports.bgBlackBright = bgBlackBright;
exports.bgBlue = bgBlue;
exports.bgBlueBright = bgBlueBright;
exports.bgCyan = bgCyan;
exports.bgCyanBright = bgCyanBright;
exports.bgGreen = bgGreen;
exports.bgGreenBright = bgGreenBright;
exports.bgMagenta = bgMagenta;
exports.bgMagentaBright = bgMagentaBright;
exports.bgRed = bgRed;
exports.bgRedBright = bgRedBright;
exports.bgWhite = bgWhite;
exports.bgWhiteBright = bgWhiteBright;
exports.bgYellow = bgYellow;
exports.bgYellowBright = bgYellowBright;
exports.black = black;
exports.blackBright = blackBright;
exports.blue = blue;
exports.blueBright = blueBright;
exports.bold = bold;
exports.createColors = createColors;
exports.cyan = cyan;
exports.cyanBright = cyanBright;
exports.dim = dim;
exports.gray = gray;
exports.green = green;
exports.greenBright = greenBright;
exports.hidden = hidden;
exports.inverse = inverse;
exports.isColorSupported = isColorSupported;
exports.italic = italic;
exports.magenta = magenta;
exports.magentaBright = magentaBright;
exports.red = red;
exports.redBright = redBright;
exports.reset = reset;
exports.strikethrough = strikethrough;
exports.underline = underline;
exports.white = white;
exports.whiteBright = whiteBright;
exports.yellow = yellow;
exports.yellowBright = yellowBright;
