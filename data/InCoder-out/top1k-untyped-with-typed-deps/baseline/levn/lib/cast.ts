// Generated by LiveScript 1.6.0
(function(){
  var parsedTypeCheck, types, toString$ = {}.toString;
  parsedTypeCheck = require('type-check').parsedTypeCheck;
  types = {
    '*': function(value: any,  options: any){
      switch (toString$.call(value).slice(8, -1)) {
      case 'Array':
        return typeCast(value, {
          type: 'Array'
        }, options);
      case 'Object':
        return typeCast(value, {
          type: 'Object'
        }, options);
      default:
        return {
          type: 'Just',
          value: typesCast(value, [
            {
              type: 'Undefined'
            }, {
              type: 'Null'
            }, {
              type: 'NaN'
            }, {
              type: 'Boolean'
            }, {
              type: 'Number'
            }, {
              type: 'Date'
            }, {
              type: 'RegExp'
            }, {
              type: 'Array'
            }, {
              type: 'Object'
            }, {
              type: 'String'
            }
          ], (options.explicit = true, options))
        };
      }
    },
    Undefined: function(it: any){
      if (it === 'undefined' || it === void 8) {
        return {
          type: 'Just',
          value: void 8
        };
      } else {
        return {
          type: 'Nothing'
        };
      }
    },
    Null: function(it: any){
      if (it === 'null') {
        return {
          type: 'Just',
          value: null
        };
      } else {
        return {
          type: 'Nothing'
        };
      }
    },
    NaN: function(it: number){
      if (it === 'NaN') {
        return {
          type: 'Just',
          value: NaN
        };
      } else {
        return {
          type: 'Nothing'
        };
      }
    },
    Boolean: function(it: any){
      if (it === 'true') {
        return {
          type: 'Just',
          value: true
        };
      } else if (it === 'false') {
        return {
          type: 'Just',
          value: false
        };
      } else {
        return {
          type: 'Nothing'
        };
      }
    },
    Number: function(it: number){
      return {
        type: 'Just',
        value: +it
      };
    },
    Int: function(it: number){
      return {
        type: 'Just',
        value: +it
      };
    },
    Float: function(it: number){
      return {
        type: 'Just',
        value: +it
      };
    },
    Date: function(value: any,  options: any){
      var that;
      if (that = /^\#([\s\S]*)\#$/.exec(value)) {
        return {
          type: 'Just',
          value: new Date(+that[1] || that[1])
        };
      } else if (options.explicit) {
        return {
          type: 'Nothing'
        };
      } else {
        return {
          type: 'Just',
          value: new Date(+value || value)
        };
      }
    },
    RegExp: function(value: any,  options: any){
      var that;
      if (that = /^\/([\s\S]*)\/([gimy]*)$/.exec(value)) {
        return {
          type: 'Just',
          value: new RegExp(that[1], that[2])
        };
      } else if (options.explicit) {
        return {
          type: 'Nothing'
        };
      } else {
        return {
          type: 'Just',
          value: new RegExp(value)
        };
      }
    },
    Array: function(value: any,  options: any){
      return castArray(value, {
        of: [{
          type: '*'
        }]
      }, options);
    },
    Object: function(value: any,  options: any){
      return castFields(value, {
        of: {}
      }, options);
    },
    String: function(it: IIterator){
      var replace, that;
      if (toString$.call(it).slice(8, -1) !== 'String') {
        return {
          type: 'Nothing'
        };
      }
      replace = function(value: any,  quote: boolean){
        return value.replace(/\\([^u]|u[0-9a-fA-F]{4})/g, function(all: any,  escaped: any){
          switch (escaped[0]) {
          case quote:
            return quote;
          case '\\':
            return '\\';
          case 'b':
            return '\b';
          case 'f':
            return '\f';
          case 'n':
            return '\n';
          case 'r':
            return '\r';
          case 't':
            return '\t';
          case 'u':
            return JSON.parse("\"" + all + "\"");
          default:
            return escaped;
          }
        });
      };
      if (that = it.match(/^'([\s\S]*)'$/)) {
        return {
          type: 'Just',
          value: replace(that[1], "'")
        };
      } else if (that = it.match(/^"([\s\S]*)"$/)) {
        return {
          type: 'Just',
          value: replace(that[1], '"')
        };
      } else {
        return {
          type: 'Just',
          value: it
        };
      }
    }
  };
  function castArray(node: ASTNode,  type: Type,  options: any){
    var typeOf, element;
    if (toString$.call(node).slice(8, -1) !== 'Array') {
      return {
        type: 'Nothing'
      };
    }
    typeOf = type.of;
    return {
      type: 'Just',
      value: (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = node).length; i$ < len$; ++i$) {
          element = ref$[i$];
          results$.push(typesCast(element, typeOf, options));
        }
        return results$;
      }())
    };
  }
  function castTuple(node: ASTNode,  type: Type,  options: TypeCastOptions){
    var result, i, i$, ref$, len$, types, cast;
    if (toString$.call(node).slice(8, -1) !== 'Array') {
      return {
        type: 'Nothing'
      };
    }
    result = [];
    i = 0;
    for (i$ = 0, len$ = (ref$ = type.of).length; i$ < len$; ++i$) {
      types = ref$[i$];
      cast = typesCast(node[i], types, options);
      if (toString$.call(cast).slice(8, -1) !== 'Undefined') {
        result.push(cast);
      }
      i++;
    }
    if (node.length <= i) {
      return {
        type: 'Just',
        value: result
      };
    } else {
      return {
        type: 'Nothing'
      };
    }
  }
  function castFields(node: FieldNode,  type: TypeNode,  options: TypeOptions){
    var typeOf, key, value;
    if (toString$.call(node).slice(8, -1) !== 'Object') {
      return {
        type: 'Nothing'
      };
    }
    typeOf = type.of;
    return {
      type: 'Just',
      value: (function(){
        var ref$, resultObj$ = {};
        for (key in ref$ = node) {
          value = ref$[key];
          resultObj$[typesCast(key, [{
            type: 'String'
          }], options)] = typesCast(value, typeOf[key] || [{
            type: '*'
          }], options);
        }
        return resultObj$;
      }())
    };
  }
  function typeCast(node: ASTNode,  typeObj: Type,  options: TypeCastOptions){
    var type, structure, castFunc, ref$;
    type = typeObj.type, structure = typeObj.structure;
    if (type) {
      castFunc = ((ref$ = options.customTypes[type]) != null ? ref$.cast : void 8) || types[type];
      if (!castFunc) {
        throw new Error("Type not defined: " + type + ".");
      }
      return castFunc(node, options, typesCast);
    } else {
      switch (structure) {
      case 'array':
        return castArray(node, typeObj, options);
      case 'tuple':
        return castTuple(node, typeObj, options);
      case 'fields':
        return castFields(node, typeObj, options);
      }
    }
  }
  function typesCast(node: ASTNode,  types: ASTNodeType[],  options: ITypeCastOptions){
    var i$, len$, type, ref$, valueType, value;
    for (i$ = 0, len$ = types.length; i$ < len$; ++i$) {
      type = types[i$];
      ref$ = typeCast(node, type, options), valueType = ref$.type, value = ref$.value;
      if (valueType === 'Nothing') {
        continue;
      }
      if (parsedTypeCheck([type], value, {
        customTypes: options.customTypes
      })) {
        return value;
      }
    }
    throw new Error("Value " + JSON.stringify(node) + " does not type check against " + JSON.stringify(types) + ".");
  }
  module.exports = function(node: Node,  types: string[],  options: IOptions){
    if (!options.explicit && types.length === 1 && types[0].type === 'String') {
      return node;
    }
    return typesCast(node, types, options);
  };
}).call(this);