// Generated by LiveScript 1.6.0
(function(){
  var ref$, any, all, isItNaN, types, defaultType, toString$ = {}.toString;
  ref$ = require('prelude-ls'), any = ref$.any, all = ref$.all, isItNaN = ref$.isItNaN;
  types = {
    Number: {
      typeOf: 'Number',
      validate: function(it: any){
        return !isItNaN(it);
      }
    },
    NaN: {
      typeOf: 'Number',
      validate: isItNaN
    },
    Int: {
      typeOf: 'Number',
      validate: function(it: any){
        return !isItNaN(it) && it % 1 === 0;
      }
    },
    Float: {
      typeOf: 'Number',
      validate: function(it: any){
        return !isItNaN(it);
      }
    },
    Date: {
      typeOf: 'Date',
      validate: function(it: any){
        return !isItNaN(it.getTime());
      }
    }
  };
  defaultType = {
    array: 'Array',
    tuple: 'Array'
  };
  function checkArray(input: any[], type: any, options: any){
    return all(function(it: any){
      return checkMultiple(it, type.of, options);
    }, input);
  }
  function checkTuple(input: any, type: any, options: any){
    var i, i$, ref$, len$, types;
    i = 0;
    for (i$ = 0, len$ = (ref$ = type.of).length; i$ < len$; ++i$) {
      types = ref$[i$];
      if (!checkMultiple(input[i], types, options)) {
        return false;
      }
      i++;
    }
    return input.length <= i;
  }
  function checkFields(input: Object, type: Object, options: Object){
    var inputKeys, numInputKeys, k, numOfKeys, key, ref$, types;
    inputKeys = {};
    numInputKeys = 0;
    for (k in input) {
      inputKeys[k] = true;
      numInputKeys++;
    }
    numOfKeys = 0;
    for (key in ref$ = type.of) {
      types = ref$[key];
      if (!checkMultiple(input[key], types, options)) {
        return false;
      }
      if (inputKeys[key]) {
        numOfKeys++;
      }
    }
    return type.subset || numInputKeys === numOfKeys;
  }
  function checkStructure(input: Object, type: Type, options: Options){
    if (!(input instanceof Object)) {
      return false;
    }
    switch (type.structure) {
    case 'fields':
      return checkFields(input, type, options);
    case 'array':
      return checkArray(input, type, options);
    case 'tuple':
      return checkTuple(input, type, options);
    }
  }
  function check(input: any, typeObj: any, options: any){
    var type, structure, setting, that;
    type = typeObj.type, structure = typeObj.structure;
    if (type) {
      if (type === '*') {
        return true;
      }
      setting = options.customTypes[type] || types[type];
      if (setting) {
        return (setting.typeOf === void 8 || setting.typeOf === toString$.call(input).slice(8, -1)) && setting.validate(input);
      } else {
        return type === toString$.call(input).slice(8, -1) && (!structure || checkStructure(input, typeObj, options));
      }
    } else if (structure) {
      if (that = defaultType[structure]) {
        if (that !== toString$.call(input).slice(8, -1)) {
          return false;
        }
      }
      return checkStructure(input, typeObj, options);
    } else {
      throw new Error("No type defined. Input: " + input + ".");
    }
  }
  function checkMultiple(input: any, types: any, options: any){
    if (toString$.call(types).slice(8, -1) !== 'Array') {
      throw new Error("Types must be in an array. Input: " + input + ".");
    }
    return any(function(it: any){
      return check(input, it, options);
    }, types);
  }
  module.exports = function(parsedType: ParsedType, input: any, options: CheckOptions){
    options == null && (options = {});
    if (options.customTypes == null) {
      options.customTypes = {};
    }
    return checkMultiple(input, parsedType, options);
  };
}).call(this);