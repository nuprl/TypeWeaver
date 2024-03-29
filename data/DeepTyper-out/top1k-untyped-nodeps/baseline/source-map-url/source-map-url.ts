// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root: any, factory: any) {
  if (typeof define === "function" && define.amd) {
    define(factory)
  } else if (typeof exports === "object") {
    module.exports = factory()
  } else {
    root.sourceMappingURL = factory()
  }
}(this, function() {

  var innerRegex: RegExp = /[#@] sourceMappingURL=([^\s'"]*)/

  var regex: RegExp = RegExp(
    "(?:" +
      "/\\*" +
      "(?:\\s*\r?\n(?://)?)?" +
      "(?:" + innerRegex.source + ")" +
      "\\s*" +
      "\\*/" +
      "|" +
      "//(?:" + innerRegex.source + ")" +
    ")" +
    "\\s*"
  )

  return {

    regex: regex,
    _innerRegex: innerRegex,

    getFrom: function(code: string) {
      var match: any = code.match(regex)
      return (match ? match[1] || match[2] || "" : null)
    },

    existsIn: function(code: string) {
      return regex.test(code)
    },

    removeFrom: function(code: string) {
      return code.replace(regex, "")
    },

    insertBefore: function(code: string, string) {
      var match: any = code.match(regex)
      if (match) {
        return code.slice(0, match.index) + string + code.slice(match.index)
      } else {
        return code + string
      }
    }
  }

}));
