// Generated by LiveScript 1.6.0
(function(){
  var reject: any, special, tokenRegex;
  reject = require('prelude-ls').reject;
  function consumeOp(tokens: any, op: string): void{
    if (tokens[0] === op) {
      return tokens.shift();
    } else {
      throw new Error("Expected '" + op + "', but got '" + tokens[0] + "' instead in " + JSON.stringify(tokens) + ".");
    }
  }
  function maybeConsumeOp(tokens: any, op: string): string{
    if (tokens[0] === op) {
      return tokens.shift();
    }
  }
  function consumeList(tokens: any, arg$, hasDelimiters: any): any{
    var open: any, close, result, untilTest;
    open = arg$[0], close = arg$[1];
    if (hasDelimiters) {
      consumeOp(tokens, open);
    }
    result = [];
    untilTest = "," + (hasDelimiters ? close : '');
    while (tokens.length && (hasDelimiters && tokens[0] !== close)) {
      result.push(consumeElement(tokens, untilTest));
      maybeConsumeOp(tokens, ',');
    }
    if (hasDelimiters) {
      consumeOp(tokens, close);
    }
    return result;
  }
  function consumeArray(tokens: any, hasDelimiters: any): any{
    return consumeList(tokens, ['[', ']'], hasDelimiters);
  }
  function consumeTuple(tokens: any, hasDelimiters: any): any{
    return consumeList(tokens, ['(', ')'], hasDelimiters);
  }
  function consumeFields(tokens: any, hasDelimiters: any): void{
    var result: any, untilTest, key;
    if (hasDelimiters) {
      consumeOp(tokens, '{');
    }
    result = {};
    untilTest = "," + (hasDelimiters ? '}' : '');
    while (tokens.length && (!hasDelimiters || tokens[0] !== '}')) {
      key = consumeValue(tokens, ':');
      consumeOp(tokens, ':');
      result[key] = consumeElement(tokens, untilTest);
      maybeConsumeOp(tokens, ',');
    }
    if (hasDelimiters) {
      consumeOp(tokens, '}');
    }
    return result;
  }
  function consumeValue(tokens: any, untilTest: any): any{
    var out: any;
    untilTest == null && (untilTest = '');
    out = '';
    while (tokens.length && -1 === untilTest.indexOf(tokens[0])) {
      out += tokens.shift();
    }
    return out;
  }
  function consumeElement(tokens: any, untilTest: any): any{
    switch (tokens[0]) {
    case '[':
      return consumeArray(tokens, true);
    case '(':
      return consumeTuple(tokens, true);
    case '{':
      return consumeFields(tokens, true);
    default:
      return consumeValue(tokens, untilTest);
    }
  }
  function consumeTopLevel(tokens: any, types: any, options: any): any{
    var ref$, type, structure, origTokens, result, finalResult, x$, y$;
    ref$ = types[0], type = ref$.type, structure = ref$.structure;
    origTokens = tokens.concat();
    if (!options.explicit && types.length === 1 && ((!type && structure) || (type === 'Array' || type === 'Object'))) {
      result = structure === 'array' || type === 'Array'
        ? consumeArray(tokens, tokens[0] === '[')
        : structure === 'tuple'
          ? consumeTuple(tokens, tokens[0] === '(')
          : consumeFields(tokens, tokens[0] === '{');
      finalResult = tokens.length ? consumeElement(structure === 'array' || type === 'Array'
        ? (x$ = origTokens, x$.unshift('['), x$.push(']'), x$)
        : (y$ = origTokens, y$.unshift('('), y$.push(')'), y$)) : result;
    } else {
      finalResult = consumeElement(tokens);
    }
    return finalResult;
  }
  special = /\[\]\(\)}{:,/.source;
  tokenRegex = RegExp('("(?:\\\\"|[^"])*")|(\'(?:\\\\\'|[^\'])*\')|(/(?:\\\\/|[^/])*/[a-zA-Z]*)|(#.*#)|([' + special + '])|([^\\s' + special + '](?:\\s*[^\\s' + special + ']+)*)|\\s*');
  module.exports = function(types: any, string, options: any){
    var tokens: any, node;
    options == null && (options = {});
    if (!options.explicit && types.length === 1 && types[0].type === 'String') {
      return string;
    }
    tokens = reject(not$, string.split(tokenRegex));
    node = consumeTopLevel(tokens, types, options);
    if (!node) {
      throw new Error("Error parsing '" + string + "'.");
    }
    return node;
  };
  function not$(x: any){ return !x; }
}).call(this);
