"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dedent;
function dedent(strings: any): any {
  // $FlowFixMe: Flow doesn't undestand .raw
  var raw: string = typeof strings === "string" ? [strings] : strings.raw;

  // first, perform interpolation
  var result: string = "";
  for (var i = 0; i < raw.length; i++) {
    result += raw[i].
    // join lines when there is a suppressed newline
    replace(/\\\n[ \t]*/g, "").

    // handle escaped backticks
    replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
  }

  // now strip indentation
  var lines: string[] = result.split("\n");
  var mindent: any = null;
  lines.forEach(function (l: string) {
    var m: any = l.match(/^(\s+)\S+/);
    if (m) {
      var indent: number = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    (function () {
      var m: any = mindent; // appease Flow
      result = lines.map(function (l: string) {
        return l[0] === " " ? l.slice(m) : l;
      }).join("\n");
    })();
  }

  return result.
  // dedent eats leading and trailing whitespace too
  trim().
  // handle escaped newlines at the end to ensure they don't get stripped too
  replace(/\\n/g, "\n");
}
