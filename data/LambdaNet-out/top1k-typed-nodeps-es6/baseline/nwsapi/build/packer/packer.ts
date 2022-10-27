/*
  Packer version 3.1 - copyright 2004-2008, Dean Edwards
  http://www.opensource.org/licenses/mit-license.php
*/

// timestamp: Mon, 30 Mar 2009 18:26:18

new (function() { ///////////////  BEGIN: CLOSURE  ///////////////

new base2.Package(this, {
  imports: "Function2,Enumerable"
});

eval(this.imports);

var IGNORE: String = RegGrp.IGNORE;
var KEYS: String   = "~";
var REMOVE: String = "";
var SPACE: String  = " ";

// =========================================================================
// packer/Parser.js
// =========================================================================

var Parser: Object = RegGrp.extend({
  put: function(expression: String, replacement: String) {
    if (typeOf(expression) == "string") {
      expression = Parser.dictionary.exec(expression);
    }
    this.base(expression, replacement);
  }
}, {
  dictionary: new RegGrp({
    OPERATOR:    /return|typeof|[\[(\^=,{}:;&|!*?]/.source,
    CONDITIONAL: /\/\*@\w*|\w*@\*\/|\/\/@\w*|@\w+/.source,
    COMMENT1:    /\/\/[^\n]*/.source,
    COMMENT2:    /\/\*[^*]*\*+([^\/][^*]*\*+)*\//.source,
    REGEXP:      /\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/.source,
    STRING1:     /'(\\.|[^'\\])*'/.source,
    STRING2:     /"(\\.|[^"\\])*"/.source
  })
});

// =========================================================================
// packer/Words.js
// =========================================================================

var Words: Object = Collection.extend({
  add: function(word: Object) {
    if (!this.has(word)) this.base(word);
    word = this.get(word);
    if (!word.index) {
      word.index = this.size();
    }
    word.count++;
    return word;
  },

  sort: function(sorter: String) {
    return this.base(sorter || function(word1: Object, word2: Object) {
      // sort by frequency
      return (word2.count - word1.count) || (word1.index - word2.index);
    });
  }
}, {
  Item: {
    constructor: function(word: String) {
      this.toString = K(word);
    },

    index: 0,
    count: 0,
    encoded: ""
  }
});

// =========================================================================
// packer/Encoder.js
// =========================================================================

var Encoder: Object = Base.extend({
  constructor: function(pattern: String, encoder: Function, ignore: String) {
    this.parser = new Parser(ignore);
    if (pattern) this.parser.put(pattern, "");
    this.encoder = encoder;
  },

  parser: null,
  encoder: Undefined,

  search: function(script: String) {
    var words: Object = new Words;
    this.parser.putAt(-1, function(word: String) {
      words.add(word);
    });
    this.parser.exec(script);
    return words;
  },

  encode: function(script: String) {
    var words: Object = this.search(script);
    words.sort();
    var index: Number = 0;
    forEach (words, function(word: Object) {
      word.encoded = this.encoder(index++);
    }, this);
    this.parser.putAt(-1, function(word: Array) {
      return words.get(word).encoded;
    });
    return this.parser.exec(script);
  }
});

// =========================================================================
// packer/Privates.js
// =========================================================================

var Privates: HTMLElement = Encoder.extend({
  constructor: function() {
    return this.base(Privates.PATTERN, function(index: Number) {
      return "_" + Packer.encode62(index);
    }, Privates.IGNORE);
  }
}, {
  IGNORE: {
    CONDITIONAL: IGNORE,
    "(OPERATOR)(REGEXP)": IGNORE
  },
  
  PATTERN: /\b_[\da-zA-Z$][\w$]*\b/g
});

// =========================================================================
// packer/Base62.js
// =========================================================================

var Base62: Object = Encoder.extend({
  encode: function(script: String) {
    var words: Array = this.search(script);

    words.sort();

    var encoded: Map = new Collection; // a dictionary of base62 -> base10
    var size: Number = words.size();
    for (var i = 0; i < size; i++) {
      encoded.put(Packer.encode62(i), i);
    }

    function replacement(word: String): String {
      return words["#" + word].replacement;
    };

    var empty: Number = K("");
    var index: Number = 0;
    forEach (words, function(word: Object) {
      if (encoded.has(word)) {
        word.index = encoded.get(word);
        word.toString = empty;
      } else {
        while (words.has(Packer.encode62(index))) index++;
        word.index = index++;
        if (word.count == 1) {
          word.toString = empty;
        }
      }
      word.replacement = Packer.encode62(word.index);
      if (word.replacement.length == word.toString().length) {
        word.toString = empty;
      }
    });

    // sort by encoding
    words.sort(function(word1: Object, word2: Object) {
      return word1.index - word2.index;
    });

    // trim unencoded words
    words = words.slice(0, this.getKeyWords(words).split("|").length);
    
    script = script.replace(this.getPattern(words), replacement);

    /* build the packed script */

    var p: String = this.escape(script);
    var a: String = "[]";
    var c: String = this.getCount(words);
    var k: String = this.getKeyWords(words);
    var e: String = this.getEncoder(words);
    var d: String = this.getDecoder(words);

    // the whole thing
    return format(Base62.UNPACK, p,a,c,k,e,d);
  },
  
  search: function(script: Object) {
    var words: Object = new Words;
    forEach (script.match(Base62.WORDS), words.add, words);
    return words;
  },

  escape: function(script: String) {
    // Single quotes wrap the final string so escape them.
    // Also, escape new lines (required by conditional comments).
    return script.replace(/([\\'])/g, "\\$1").replace(/[\r\n]+/g, "\\n");
  },

  getCount: function(words: Object) {
    return words.size() || 1;
  },

  getDecoder: function(words: Array) {
    // returns a pattern used for fast decoding of the packed script
    var trim: Object = new RegGrp({
      "(\\d)(\\|\\d)+\\|(\\d)": "$1-$3",
      "([a-z])(\\|[a-z])+\\|([a-z])": "$1-$3",
      "([A-Z])(\\|[A-Z])+\\|([A-Z])": "$1-$3",
      "\\|": ""
    });
    var pattern: Number = trim.exec(words.map(function(word: Object) {
      if (word.toString()) return word.replacement;
      return "";
    }).slice(0, 62).join("|"));

    if (!pattern) return "^$";

    pattern = "[" + pattern + "]";

    var size: Number = words.size();
    if (size > 62) {
      pattern = "(" + pattern + "|";
      var c: Number = Packer.encode62(size).charAt(0);
      if (c > "9") {
        pattern += "[\\\\d";
        if (c >= "a") {
          pattern += "a";
          if (c >= "z") {
            pattern += "-z";
            if (c >= "A") {
              pattern += "A";
              if (c > "A") pattern += "-" + c;
            }
          } else if (c == "b") {
            pattern += "-" + c;
          }
        }
        pattern += "]";
      } else if (c == 9) {
        pattern += "\\\\d";
      } else if (c == 2) {
        pattern += "[12]";
      } else if (c == 1) {
        pattern += "1";
      } else {
        pattern += "[1-" + c + "]";
      }

      pattern += "\\\\w)";
    }
    return pattern;
  },

  getEncoder: function(words: Object) {
    var size: Number = words.size();
    return Base62["ENCODE" + (size > 10 ? size > 36 ? 62 : 36 : 10)];
  },

  getKeyWords: function(words: Array) {
    return words.map(String).join("|").replace(/\|+$/, "");
  },

  getPattern: function(words: String) {
    words = words.map(String).join("|").replace(/\|{2,}/g, "|").replace(/^\|+|\|+$/g, "") || "\\x0";
    return new RegExp("\\b(" + words + ")\\b", "g");
  }
}, {
  WORDS: /\b[\da-zA-Z]\b|\w{2,}/g,

  ENCODE10: "String",
  ENCODE36: "function(c){return c.toString(36)}",
  ENCODE62: "function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))}",

  UNPACK: "eval(function(p,a,c,k,e,r){e=%5;if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];" +
    "k=[function(e){return r[e]||e}];e=function(){return'%6'};c=1};while(c--)if(k[c])p=p." +
    "replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);return p}('%1',%2,%3,'%4'.split('|'),0,{}))"
});

// =========================================================================
// packer/Packer.js
// =========================================================================

global.Packer = Base.extend({
  constructor: function() {
    this.minifier = new Minifier;
    this.shrinker = new Shrinker;
    this.privates = new Privates;
    this.base62   = new Base62;
  },

  minifier: null,
  shrinker: null,
  privates: null,
  base62:   null,
  
  pack: function(script: String, base62: Boolean, shrink: Boolean, privates: Boolean) {
    script = this.minifier.minify(script);
    if (shrink) script = this.shrinker.shrink(script);
    if (privates) script = this.privates.encode(script);
    if (base62) script = this.base62.encode(script);
    return script;
  }
}, {
  version: "3.1",
  
  init: function() {
    eval("var e=this.encode62=" + Base62.ENCODE62);
  },
  
  data: new Parser({
    "STRING1": IGNORE,
    'STRING2': IGNORE,
    "CONDITIONAL": IGNORE, // conditional comments
    "(OPERATOR)\\s*(REGEXP)": "$1$2"
  }),

  encode52: function(c: String) {
    // Base52 encoding (a-Z)
    function encode(c: Number): String {
      return (c < 52 ? '' : encode(parseInt(c / 52))) +
        ((c = c % 52) > 25 ? String.fromCharCode(c + 39) : String.fromCharCode(c + 97));
    };
    var encoded: String = encode(c);
    if (/^(do|if|in)$/.test(encoded)) encoded = encoded.slice(1) + 0;
    return encoded;
  }
});

// =========================================================================
// packer/Minifier.js
// =========================================================================

var Minifier: Object = Base.extend({
  minify: function(script: String) {
    // packing with no additional options
    script += "\n";
    script = script.replace(Minifier.CONTINUE, "");
    script = Minifier.comments.exec(script);
    script = Minifier.clean.exec(script);
    script = Minifier.whitespace.exec(script);
    script = Minifier.concat.exec(script);
    return script;
  }
}, {
  CONTINUE: /\\\r?\n/g,
  
  init: function() {
    this.concat = new Parser(this.concat).merge(Packer.data);
    extend(this.concat, "exec", function(script: String) {
      var parsed: String = this.base(script);
      while (parsed != script) {
        script = parsed;
        parsed = this.base(script);
      }
      return parsed;
    });
    forEach.csv("comments,clean,whitespace", function(name: String) {
      this[name] = Packer.data.union(new Parser(this[name]));
    }, this);
    this.conditionalComments = this.comments.copy();
    this.conditionalComments.putAt(-1, " $3");
    this.whitespace.removeAt(2); // conditional comments
    this.comments.removeAt(2);
  },
  
  clean: {
    "\\(\\s*([^;)]*)\\s*;\\s*([^;)]*)\\s*;\\s*([^;)]*)\\)": "($1;$2;$3)", // for (;;) loops
    "throw[^};]+[};]": IGNORE, // a safari 1.3 bug
    ";+\\s*([};])": "$1"
  },

  comments: {
    ";;;[^\\n]*\\n": REMOVE,
    "(COMMENT1)\\n\\s*(REGEXP)?": "\n$3",
    "(COMMENT2)\\s*(REGEXP)?": function(match: String, comment: String, $2: Function, regexp: String) {
      if (/^\/\*@/.test(comment) && /@\*\/$/.test(comment)) {
        comment = Minifier.conditionalComments.exec(comment);
      } else {
        comment = "";
      }
      return comment + " " + (regexp || "");
    }
  },

  concat: {
    "(STRING1)\\+(STRING1)": function(match: String, a: Array, $2: String, b: Array) {
      return a.slice(0, -1) + b.slice(1);
    },
    "(STRING2)\\+(STRING2)": function(match: String, a: Array, $2: String, b: Array) {
      return a.slice(0, -1) + b.slice(1);
    }
  },
  
  whitespace: {
    "\\/\\/@[^\\n]*\\n": IGNORE,
    "@\\s+\\b": "@ ", // protect conditional comments
    "\\b\\s+@": " @",
    "(\\d)\\s+(\\.\\s*[a-z\\$_\\[(])": "$1 $2", // http://dean.edwards.name/weblog/2007/04/packer3/#comment84066
    "([+-])\\s+([+-])": "$1 $2", // c = a++ +b;
    "(\\w)\\s+([\\u0080-\\uffff])": "$1 $2", // http://code.google.com/p/base2/issues/detail?id=78
    "\\b\\s+\\$\\s+\\b": " $ ", // var $ in
    "\\$\\s+\\b": "$ ", // object$ in
    "\\b\\s+\\$": " $", // return $object
//  "\\b\\s+#": " #",   // CSS
    "\\b\\s+\\b": SPACE,
    "\\s+": REMOVE
  }
});

// =========================================================================
// packer/Shrinker.js
// =========================================================================

var Shrinker: HTMLElement = Base.extend({
  decodeData: function(script: String) {
    // put strings and regular expressions back
    var data: Object = this._data; // encoded strings and regular expressions
    delete this._data;
    return script.replace(Shrinker.ENCODED_DATA, function(match: Function, index: Number) {
      return data[index];
    });
  },

  encodeData: function(script: String) {
    // encode strings and regular expressions
    var data: Array = this._data = []; // encoded strings and regular expressions
    return Packer.data.exec(script, function(match: String, operator: Number, regexp: String) {
      var replacement: String = "\x01" + data.length + "\x01";
      if (regexp) {
        replacement = operator + replacement;
        match = regexp;
      }
      data.push(match);
      return replacement;
    });
  },
  
  shrink: function(script: String) {
    script = this.encodeData(script);
    
    // Windows Scripting Host cannot do regexp.test() on global regexps.
    function global(regexp: Object): Object {
      // This function creates a global version of the passed regexp.
      return new RegExp(regexp.source, "g");
    };
        
    // identify blocks, particularly identify function blocks (which define scope)
    var BLOCK: RegExp         = /((catch|do|if|while|with|function)\b[^~{};]*(\(\s*[^{};]*\s*\))\s*)?(\{[^{}]*\})/;
    var BLOCK_g: String       = global(BLOCK);
    var BRACKETS: RegExp      = /\{[^{}]*\}|\[[^\[\]]*\]|\([^\(\)]*\)|~[^~]+~/;
    var BRACKETS_g: String    = global(BRACKETS);
    var ENCODED_BLOCK: RegExp = /~#?(\d+)~/;
    var IDENTIFIER: RegExp    = /[a-zA-Z_$][\w\$]*/g;
    var SCOPED: RegExp        = /~#(\d+)~/;
    var VAR_g: RegExp         = /\bvar\b/g;
    var VARS: RegExp          = /\bvar\s+[\w$]+[^;#]*|\bfunction\s+[\w$]+/g;
    var VAR_TIDY: RegExp      = /\b(var|function)\b|\sin\s+[^;]+/g;
    var VAR_EQUAL: RegExp     = /\s*=[^,;]*/g;
    
    var blocks: Array = []; // store program blocks (anything between braces {})
    var total: Number = 0;
    // encoder for program blocks
    function encodeBlocks($: Function, prefix: String, blockType: String, args: String, block: String): String {
      if (!prefix) prefix = "";
      if (blockType == "function") {
        // decode the function block (THIS IS THE IMPORTANT BIT)
        // We are retrieving all sub-blocks and will re-parse them in light
        // of newly shrunk variables
        block = args + decodeBlocks(block, SCOPED);
        prefix = prefix.replace(BRACKETS, "");
        
        // create the list of variable and argument names
        args = args.slice(1, -1);
        
        if (args != "_no_shrink_") {
          var vars: String = match(block, VARS).join(";").replace(VAR_g, ";var");
          while (BRACKETS.test(vars)) {
            vars = vars.replace(BRACKETS_g, "");
          }
          vars = vars.replace(VAR_TIDY, "").replace(VAR_EQUAL, "");
        }
        block = decodeBlocks(block, ENCODED_BLOCK);
        
        // process each identifier
        if (args != "_no_shrink_") {
          var count: Number = 0, shortId: String;
          var ids: Array = match([args, vars], IDENTIFIER);
          var processed: Object = {};
          for (var i = 0; i < ids.length; i++) {
            id = ids[i];
            if (!processed["#" + id]) {
              processed["#" + id] = true;
              id = rescape(id);
              // encode variable names
              while (new RegExp(Shrinker.PREFIX + count + "\\b").test(block)) count++;
              var reg: HTMLElement = new RegExp("([^\\w$.])" + id + "([^\\w$:])");
              while (reg.test(block)) {
                block = block.replace(global(reg), "$1" + Shrinker.PREFIX + count + "$2");
              }
              var reg: HTMLElement = new RegExp("([^{,\\w$.])" + id + ":", "g");
              block = block.replace(reg, "$1" + Shrinker.PREFIX + count + ":");
              count++;
            }
          }
          total = Math.max(total, count);
        }
        var replacement: String = prefix + "~" + blocks.length + "~";
        blocks.push(block);
      } else {
        var replacement: String = "~#" + blocks.length + "~";
        blocks.push(prefix + block);
      }
      return replacement;
    };

    // decoder for program blocks
    function decodeBlocks(script: String, encoded: Object): String {
      while (encoded.test(script)) {
        script = script.replace(global(encoded), function(match: Function, index: Number) {
          return blocks[index];
        });
      }
      return script;
    };
    
    // encode blocks, as we encode we replace variable and argument names
    while (BLOCK.test(script)) {
      script = script.replace(BLOCK_g, encodeBlocks);
    }
    
    // put the blocks back
    script = decodeBlocks(script, ENCODED_BLOCK);
    
    var shortId: String, count: Number = 0;
    var shrunk: HTMLElement = new Encoder(Shrinker.SHRUNK, function() {
      // find the next free short name
      do shortId = Packer.encode52(count++);
      while (new RegExp("[^\\w$.]" + shortId + "[^\\w$:]").test(script));
      return shortId;
    });
    script = shrunk.encode(script);
    
    return this.decodeData(script);
  }
}, {
  ENCODED_DATA: /\x01(\d+)\x01/g,
  PREFIX:       "\x02",
  SHRUNK:       /\x02\d+\b/g
});

}); ////////////////////  END: CLOSURE  /////////////////////////////////////
