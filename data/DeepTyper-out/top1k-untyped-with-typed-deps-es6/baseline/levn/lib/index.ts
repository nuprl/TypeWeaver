// Generated by LiveScript 1.6.0
(function(){
  var parseString: any, cast, parseType, VERSION, parsedTypeParse, parse;
  parseString = require('./parse-string');
  cast = require('./cast');
  parseType = require('type-check').parseType;
  VERSION = '0.4.1';
  parsedTypeParse = function(parsedType: any, string, options: any){
    options == null && (options = {});
    options.explicit == null && (options.explicit = false);
    options.customTypes == null && (options.customTypes = {});
    return cast(parseString(parsedType, string, options), parsedType, options);
  };
  parse = function(type, string, options: any){
    return parsedTypeParse(parseType(type), string, options);
  };

  export default {
    VERSION: VERSION,
    parse: parse,
    parsedTypeParse: parsedTypeParse
  };
}).call(this);