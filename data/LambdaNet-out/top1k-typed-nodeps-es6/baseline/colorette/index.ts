import * as tty from "tty"

const {
  env = {},
  argv = [],
  platform = "",
} = typeof process === "undefined" ? {} : process

const isDisabled: boolean = "NO_COLOR" in env || argv.includes("--no-color")
const isForced: boolean = "FORCE_COLOR" in env || argv.includes("--color")
const isWindows: boolean = platform === "win32"
const isDumbTerminal: boolean = env.TERM === "dumb"

const isCompatibleTerminal: boolean =
  tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal

const isCI: boolean =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env)

export const isColorSupported: boolean =
  !isDisabled &&
  (isForced || (isWindows && !isDumbTerminal) || isCompatibleTerminal || isCI)

const replaceClose: Function = (
  index: number,
  string: string,
  close: string,
  replace: string,
  head: number = string.substring(0, index) + replace,
  tail: string = string.substring(index + close.length),
  next: object = tail.indexOf(close)
) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace))

const clearBleed: Function = (index: string, string: string, open: number, close: number, replace: any[]) =>
  index < 0
    ? open + string + close
    : open + replaceClose(index, string, close, replace) + close

const filterEmpty: Function =
  (open: string, close: string, replace: any[] = open, at: string = open.length + 1) =>
  (string: number) =>
    string || !(string === "" || string === undefined)
      ? clearBleed(
          ("" + string).indexOf(close, at),
          string,
          open,
          close,
          replace
        )
      : ""

const init: Function = (open: string, close: string, replace: any[]) =>
  filterEmpty(`\x1b[${open}m`, `\x1b[${close}m`, replace)

const colors: object = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1b[22m\x1b[1m"),
  dim: init(2, 22, "\x1b[22m\x1b[2m"),
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
}

export const createColors: Function = ({ useColor = isColorSupported } = {}) =>
  useColor
    ? colors
    : Object.keys(colors).reduce(
        (colors, key) => ({ ...colors, [key]: String }),
        {}
      )

export const {
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
} = createColors()
