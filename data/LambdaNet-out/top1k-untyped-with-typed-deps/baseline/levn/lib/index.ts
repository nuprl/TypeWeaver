// Generated by LiveScript 1.6.0
(function(){
  var parseString: Function, cast: Function, parseType: Function, VERSION: string, parsedTypeParse: Function, parse: Function;
  parseString = require('./parse-string');
  cast = require('./cast');
  parseType = require('type-check').parseType;
  VERSION = '0.4.1';
  parsedTypeParse = function(parsedType: string, string: string, options: object){
    options == null && (options = {});
    options.explicit == null && (options.explicit = false);
    options.customTypes == null && (options.customTypes = {});
    return cast(parseString(parsedType, string, options), parsedType, options);
  };
  parse = function(type: number, string: string, options: object){
    return parsedTypeParse(parseType(type), string, options);
  };
  module.exports = {
    VERSION: VERSION,
    parse: parse,
    parsedTypeParse: parsedTypeParse
  };
}).call(this);
