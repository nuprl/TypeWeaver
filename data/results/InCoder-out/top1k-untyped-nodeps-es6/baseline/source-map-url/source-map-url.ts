// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root: any,  factory: any) {
  if (typeof define === "function" && define.amd) {
    define(factory)
  } else if (typeof exports === "object") {
    export default factory();
  } else {
    root.sourceMappingURL = factory()
  }
}(this, function() {

  var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/

  var regex = RegExp(
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

    getFrom: function(code: any) {
      var match = code.match(regex)
      return (match ? match[1] || match[2] || "" : null)
    },

    existsIn: function(code: Code) {
      return regex.test(code)
    },

    removeFrom: function(code: any) {
      return code.replace(regex, "")
    },

    insertBefore: function(code: any,  string: any) {
      var match = code.match(regex)
      if (match) {
        return code.slice(0, match.index) + string + code.slice(match.index)
      } else {
        return code + string
      }
    }
  }

}));