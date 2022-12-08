/*
  base2 - copyright 2007-2008, Dean Edwards
  http://code.google.com/p/base2/
  http://www.opensource.org/licenses/mit-license.php

  Contributors:
    Doeke Zanstra
*/

// timestamp: Sat, 06 Sep 2008 16:52:32

var base2: object = {
  name:    "base2",
  version: "1.0",
  exports:
    "Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp," +
    "Undefined,Null,This,True,False,assignID,detect,global",
  namespace: ""
};

new (function(_no_shrink_: Function) { ///////////////  BEGIN: CLOSURE  ///////////////

// =========================================================================
// base2/header.js
// =========================================================================

var Undefined: string = K(), Null: string = K(null), True: string = K(true), False: string = K(false), This: Function = function(){return this};

var global: object = This();
var base2: HTMLElement = global.base2;

// private
var _FORMAT: RegExp = /%([1-9])/g;
var _LTRIM: RegExp = /^\s\s*/;
var _RTRIM: RegExp = /\s\s*$/;
var _RESCAPE: RegExp = /([\/()[\]{}|*+-.,^$?\\])/g;             // safe regular expressions
var _BASE: any[] = /try/.test(detect) ? /\bbase\b/ : /.*/;     // some platforms don't allow decompilation
var _HIDDEN: any[] = ["constructor", "toString", "valueOf"];   // only override these when prototyping
var _MSIE_NATIVE_FUNCTION: object = detect("(jscript)") ?
  new RegExp("^" + rescape(isNaN).replace(/isNaN/, "\\w+") + "$") : {test: False};

var _counter: number = 1;
var _slice: Function = Array.prototype.slice;

_Function_forEach(); // make sure this is initialised

function assignID(object: object): string {
  // Assign a unique ID to an object.
  if (!object.base2ID) object.base2ID = "b2_" + _counter++;
  return object.base2ID;
};

// =========================================================================
// base2/Base.js
// =========================================================================

// http://dean.edwards.name/weblog/2006/03/base/

var _subclass: Function = function(_instance: string, _static: string) {
  // Build the prototype.
  base2.__prototyping = this.prototype;
  var _prototype: HTMLElement = new this;
  if (_instance) extend(_prototype, _instance);
  delete base2.__prototyping;
  
  // Create the wrapper for the constructor function.
  var _constructor: Function = _prototype.constructor;
  function _class(): string {
    // Don't call the constructor function when prototyping.
    if (!base2.__prototyping) {
      if (this.constructor == arguments.callee || this.__constructing) {
        // Instantiation.
        this.__constructing = true;
        _constructor.apply(this, arguments);
        delete this.__constructing;
      } else {
        // Casting.
        return extend(arguments[0], _prototype);
      }
    }
    return this;
  };
  _prototype.constructor = _class;
  
  // Build the static interface.
  for (var i in Base) _class[i] = this[i];
  _class.ancestor = this;
  _class.base = Undefined;
  //_class.init = Undefined;
  if (_static) extend(_class, _static);
  _class.prototype = _prototype;
  if (_class.init) _class.init();
  
  // introspection (removed when packed)
  ;;; _class["#implements"] = [];
  ;;; _class["#implemented_by"] = [];
  
  return _class;
};

var Base: object = _subclass.call(Object, {
  constructor: function() {
    if (arguments.length > 0) {
      this.extend(arguments[0]);
    }
  },
  
  base: function() {
    // Call this method from any other method to invoke the current method's ancestor (super).
  },
  
  extend: delegate(extend)
}, Base = {
  ancestorOf: function(klass: string) {
    return _ancestorOf(this, klass);
  },
  
  extend: _subclass,
    
  forEach: function(object: object, block: Function, context: Function) {
    _Function_forEach(this, object, block, context);
  },
  
  implement: function(source: object) {
    if (typeof source == "function") {
      ;;; if (_ancestorOf(Base, source)) {
        // introspection (removed when packed)
        ;;; this["#implements"].push(source);
        ;;; source["#implemented_by"].push(this);
      ;;; }
      source = source.prototype;
    }
    // Add the interface using the extend() function.
    extend(this.prototype, source);
    return this;
  }
});

// =========================================================================
// base2/Package.js
// =========================================================================

var Package: object = Base.extend({
  constructor: function(_private: object, _public: string) {
    this.extend(_public);
    if (this.init) this.init();
    
    if (this.name && this.name != "base2") {
      if (!this.parent) this.parent = base2;
      this.parent.addName(this.name, this);
      this.namespace = format("var %1=%2;", this.name, String2.slice(this, 1, -1));
    }
    
    if (_private) {
      // This next line gets round a bug in old Mozilla browsers
      var JSNamespace: string = base2.JavaScript ? base2.JavaScript.namespace : "";
      // This string should be evaluated immediately after creating a Package object.
      _private.imports = Array2.reduce(csv(this.imports), function(namespace: number, name: string) {
        var ns: HTMLElement = lookup(name) || lookup("JavaScript." + name);
        ;;; assert(ns, format("Object not found: '%1'.", name), ReferenceError);
        return namespace += ns.namespace;
      }, "var base2=(function(){return this.base2})();" + base2.namespace + JSNamespace) + lang.namespace;
      
      // This string should be evaluated after you have created all of the objects
      // that are being exported.
      _private.exports = Array2.reduce(csv(this.exports), function(namespace: number, name: string) {
        var fullName: string = this.name + "." + name;
        this.namespace += "var " + name + "=" + fullName + ";";
        return namespace += "if(!" + fullName + ")" + fullName + "=" + name + ";";
      }, "", this) + "this._label_" + this.name + "();";
      
      var pkg: any[] = this;
      var packageName: string = String2.slice(this, 1, -1);
      _private["_label_" + this.name] = function() {
        Package.forEach (pkg, function(object: object, name: string) {
          if (object && object.ancestorOf == Base.ancestorOf) {
            object.toString = K(format("[%1.%2]", packageName, name));
            if (object.prototype.toString == Base.prototype.toString) {
              object.prototype.toString = K(format("[object %1.%2]", packageName, name));
            }
          }
        });
      };
    }

    function lookup(names: any[]): object {
      names = names.split(".");
      var value: object = base2, i: number = 0;
      while (value && names[i] != null) {
        value = value[names[i++]];
      }
      return value;
    };
  },

  exports: "",
  imports: "",
  name: "",
  namespace: "",
  parent: null,

  addName: function(name: string, value: string) {
    if (!this[name]) {
      this[name] = value;
      this.exports += "," + name;
      this.namespace += format("var %1=%2.%1;", name, this.name);
    }
  },

  addPackage: function(name: string) {
    this.addName(name, new Package(null, {name: name, parent: this}));
  },
  
  toString: function() {
    return format("[%1]", this.parent ? String2.slice(this.parent, 1, -1) + "." + this.name : this.name);
  }
});

// =========================================================================
// base2/Abstract.js
// =========================================================================

var Abstract: object = Base.extend({
  constructor: function() {
    throw new TypeError("Abstract class cannot be instantiated.");
  }
});

// =========================================================================
// base2/Module.js
// =========================================================================

var _moduleCount: number = 0;

var Module: object = Abstract.extend(null, {
  namespace: "",

  extend: function(_interface: boolean, _static: number) {
    // Extend a module to create a new module.
    var module: string = this.base();
    var index: number = _moduleCount++;
    module.namespace = "";
    module.partial = this.partial;
    module.toString = K("[base2.Module[" + index + "]]");
    Module[index] = module;
    // Inherit class methods.
    module.implement(this);
    // Implement module (instance AND static) methods.
    if (_interface) module.implement(_interface);
    // Implement static properties and methods.
    if (_static) {
      extend(module, _static);
      if (module.init) module.init();
    }
    return module;
  },

  forEach: function(block: Function, context: string) {
    _Function_forEach (Module, this.prototype, function(method: string, name: string) {
      if (typeOf(method) == "function") {
        block.call(context, this[name], name, this);
      }
    }, this);
  },

  implement: function(_interface: object) {
    var module: string = this;
    var id: string = module.toString().slice(1, -1);
    if (typeof _interface == "function") {
      if (!_ancestorOf(_interface, module)) {
        this.base(_interface);
      }
      if (_ancestorOf(Module, _interface)) {
        // Implement static methods.
        for (var name in _interface) {
          if (module[name] === undefined) {
            var property: Function = _interface[name];
            if (typeof property == "function" && property.call && _interface.prototype[name]) {
              property = _staticModuleMethod(_interface, name);
            }
            module[name] = property;
          }
        }
        module.namespace += _interface.namespace.replace(/base2\.Module\[\d+\]/g, id);
      }
    } else {
      // Add static interface.
      extend(module, _interface);
      // Add instance interface.
      _extendModule(module, _interface);
    }
    return module;
  },

  partial: function() {
    var module: string = Module.extend();
    var id: string = module.toString().slice(1, -1);
    // partial methods are already bound so remove the binding to speed things up
    module.namespace = this.namespace.replace(/(\w+)=b[^\)]+\)/g, "$1=" + id + ".$1");
    this.forEach(function(method: string, name: string) {
      module[name] = partial(bind(method, module));
    });
    return module;
  }
});

function _extendModule(module: string, _interface: object): void {
  var proto: object = module.prototype;
  var id: string = module.toString().slice(1, -1);
  for (var name in _interface) {
    var property: Function = _interface[name], namespace: string = "";
    if (name.charAt(0) == "@") { // object detection
      if (detect(name.slice(1))) _extendModule(module, property);
    } else if (!proto[name]) {
      if (name == name.toUpperCase()) {
        namespace = "var " + name + "=" + id + "." + name + ";";
      } else if (typeof property == "function" && property.call) {
        namespace = "var " + name + "=base2.lang.bind('" + name + "'," + id + ");";
        proto[name] = _moduleMethod(module, name);
        ;;; proto[name]._module = module; // introspection
      }
      if (module.namespace.indexOf(namespace) == -1) {
        module.namespace += namespace;
      }
    }
  }
};

function _staticModuleMethod(module: string, name: string): Function {
  return function() {
    return module[name].apply(module, arguments);
  };
};

function _moduleMethod(module: string, name: string): Function {
  return function() {
    var args: any[] = _slice.call(arguments);
    args.unshift(this);
    return module[name].apply(module, args);
  };
};

// =========================================================================
// base2/Enumerable.js
// =========================================================================

var Enumerable: object = Module.extend({
  every: function(object: object, test: Function, context: string) {
    var result: boolean = true;
    try {
      forEach (object, function(value: string, key: string) {
        result = test.call(context, value, key, object);
        if (!result) throw StopIteration;
      });
    } catch (error) {
      if (error != StopIteration) throw error;
    }
    return !!result; // cast to boolean
  },
  
  filter: function(object: object, test: Function, context: string) {
    var i: number = 0;
    return this.reduce(object, function(result: object, value: string, key: string) {
      if (test.call(context, value, key, object)) {
        result[i++] = value;
      }
      return result;
    }, []);
  },
  
  invoke: function(object: object, method: Function) {
    // Apply a method to each item in the enumerated object.
    var args: string = _slice.call(arguments, 2);
    return this.map(object, (typeof method == "function") ? function(item: string) {
      return item == null ? undefined : method.apply(item, args);
    } : function(item: object) {
      return item == null ? undefined : item[method].apply(item, args);
    });
  },
  
  map: function(object: object, block: Function, context: string) {
    var result: Promise = [], i: number = 0;
    forEach (object, function(value: string, key: string) {
      result[i++] = block.call(context, value, key, object);
    });
    return result;
  },
  
  pluck: function(object: object, key: string) {
    return this.map(object, function(item: object) {
      return item == null ? undefined : item[key];
    });
  },
  
  reduce: function(object: object, block: Function, result: string, context: string) {
    var initialised: boolean = arguments.length > 2;
    forEach (object, function(value: string, key: string) {
      if (initialised) { 
        result = block.call(context, result, value, key, object);
      } else { 
        result = value;
        initialised = true;
      }
    });
    return result;
  },
  
  some: function(object: object, test: any[], context: string) {
    return !this.every(object, not(test), context);
  }
});

// =========================================================================
// base2/Map.js
// =========================================================================

// http://wiki.ecmascript.org/doku.php?id=proposals:dictionary

var _HASH: string = "#";

var Map: HTMLElement = Base.extend({
  constructor: function(values: string) {
    if (values) this.merge(values);
  },

  clear: function() {
    for (var key in this) if (key.indexOf(_HASH) == 0) {
      delete this[key];
    }
  },

  copy: function() {
    base2.__prototyping = true; // not really prototyping but it stops [[construct]] being called
    var copy: object = new this.constructor;
    delete base2.__prototyping;
    for (var i in this) if (this[i] !== copy[i]) {
      copy[i] = this[i];
    }
    return copy;
  },

  forEach: function(block: Function, context: string) {
    for (var key in this) if (key.indexOf(_HASH) == 0) {
      block.call(context, this[key], key.slice(1), this);
    }
  },

  get: function(key: string) {
    return this[_HASH + key];
  },

  getKeys: function() {
    return this.map(II);
  },

  getValues: function() {
    return this.map(I);
  },

  // Ancient browsers throw an error if we use "in" as an operator.
  has: function(key: string) {
  /*@cc_on @*/
  /*@if (@_jscript_version < 5.5)
    return $Legacy.has(this, _HASH + key);
  @else @*/
    return _HASH + key in this;
  /*@end @*/
  },

  merge: function(values: Function) {
    var put: string = flip(this.put);
    forEach (arguments, function(values: any[]) {
      forEach (values, put, this);
    }, this);
    return this;
  },

  put: function(key: string, value: string) {
    // create the new entry (or overwrite the old entry).
    this[_HASH + key] = value;
  },

  remove: function(key: string) {
    delete this[_HASH + key];
  },

  size: function() {
    // this is expensive because we are not storing the keys
    var size: number = 0;
    for (var key in this) if (key.indexOf(_HASH) == 0) size++;
    return size;
  },

  union: function(values: Function) {
    return this.merge.apply(this.copy(), arguments);
  }
});

Map.implement(Enumerable);

Map.prototype.filter = function(test: Function, context: string) {
  return this.reduce(function(result: object, value: string, key: string) {
    if (!test.call(context, value, key, this)) {
      result.remove(key);
    }
    return result;
  }, this.copy(), this);
};

// =========================================================================
// base2/Collection.js
// =========================================================================

// A Map that is more array-like (accessible by index).

// Collection classes have a special (optional) property: Item
// The Item property points to a constructor function.
// Members of the collection must be an instance of Item.

// The static create() method is responsible for all construction of collection items.
// Instance methods that add new items (add, put, insertAt, putAt) pass *all* of their arguments
// to the static create() method. If you want to modify the way collection items are 
// created then you only need to override this method for custom collections.

var _KEYS: string = "~";

var Collection: object = Map.extend({
  constructor: function(values: string) {
    this[_KEYS] = new Array2;
    this.base(values);
  },
  
  add: function(key: string, item: string) {
    // Duplicates not allowed using add().
    // But you can still overwrite entries using put().
    assert(!this.has(key), "Duplicate key '" + key + "'.");
    this.put.apply(this, arguments);
  },

  clear: function() {
    this.base();
    this[_KEYS].length = 0;
  },

  copy: function() {
    var copy: object = this.base();
    copy[_KEYS] = this[_KEYS].copy();
    return copy;
  },

  forEach: function(block: Function, context: string) {
    var keys: any[] = this[_KEYS];
    var length: number = keys.length;
    for (var i = 0; i < length; i++) {
      block.call(context, this[_HASH + keys[i]], keys[i], this);
    }
  },

  getAt: function(index: number) {
    var key: string = this[_KEYS].item(index);
    return (key === undefined)  ? undefined : this[_HASH + key];
  },

  getKeys: function() {
    return this[_KEYS].copy();
  },

  indexOf: function(key: string) {
    return this[_KEYS].indexOf(String(key));
  },

  insertAt: function(index: string, key: string, item: string) {
    assert(this[_KEYS].item(index) !== undefined, "Index out of bounds.");
    assert(!this.has(key), "Duplicate key '" + key + "'.");
    this[_KEYS].insertAt(index, String(key));
    this[_HASH + key] = null; // placeholder
    this.put.apply(this, _slice.call(arguments, 1));
  },

  item: function(keyOrIndex: string) {
    return this[typeof keyOrIndex == "number" ? "getAt" : "get"](keyOrIndex);
  },

  put: function(key: string, item: string) {
    if (!this.has(key)) {
      this[_KEYS].push(String(key));
    }
    var klass: object = this.constructor;
    if (klass.Item && !instanceOf(item, klass.Item)) {
      item = klass.create.apply(klass, arguments);
    }
    this[_HASH + key] = item;
  },

  putAt: function(index: number, item: string) {
    arguments[0] = this[_KEYS].item(index);
    assert(arguments[0] !== undefined, "Index out of bounds.");
    this.put.apply(this, arguments);
  },

  remove: function(key: string) {
    // The remove() method of the Array object can be slow so check if the key exists first.
    if (this.has(key)) {
      this[_KEYS].remove(String(key));
      delete this[_HASH + key];
    }
  },

  removeAt: function(index: string) {
    var key: string = this[_KEYS].item(index);
    if (key !== undefined) {
      this[_KEYS].removeAt(index);
      delete this[_HASH + key];
    }
  },

  reverse: function() {
    this[_KEYS].reverse();
    return this;
  },

  size: function() {
    return this[_KEYS].length;
  },

  slice: function(start: string, end: string) {
    var sliced: object = this.copy();
    if (arguments.length > 0) {
      var keys: any[] = this[_KEYS], removed: any[] = keys;
      sliced[_KEYS] = Array2(_slice.apply(keys, arguments));
      if (sliced[_KEYS].length) {
        removed = removed.slice(0, start);
        if (arguments.length > 1) {
          removed = removed.concat(keys.slice(end));
        }
      }
      for (var i = 0; i < removed.length; i++) {
        delete sliced[_HASH + removed[i]];
      }
    }
    return sliced;
  },

  sort: function(compare: Function) { // optimised (refers to _HASH)
    if (compare) {
      this[_KEYS].sort(bind(function(key1: string, key2: string) {
        return compare(this[_HASH + key1], this[_HASH + key2], key1, key2);
      }, this));
    } else this[_KEYS].sort();
    return this;
  },

  toString: function() {
    return "(" + (this[_KEYS] || "") + ")";
  }
}, {
  Item: null, // If specified, all members of the collection must be instances of Item.
  
  create: function(key: string, item: string) {
    return this.Item ? new this.Item(key, item) : item;
  },
  
  extend: function(_instance: string, _static: number) {
    var klass: object = this.base(_instance);
    klass.create = this.create;
    if (_static) extend(klass, _static);
    if (!klass.Item) {
      klass.Item = this.Item;
    } else if (typeof klass.Item != "function") {
      klass.Item = (this.Item || Base).extend(klass.Item);
    }
    if (klass.init) klass.init();
    return klass;
  }
});

// =========================================================================
// base2/RegGrp.js
// =========================================================================

// A collection of regular expressions and their associated replacement values.
// A Base class for creating parsers.

var _RG_BACK_REF: RegExp        = /\\(\d+)/g,
    _RG_ESCAPE_CHARS: RegExp    = /\\./g,
    _RG_ESCAPE_BRACKETS: RegExp = /\(\?[:=!]|\[[^\]]+\]/g,
    _RG_BRACKETS: RegExp        = /\(/g,
    _RG_LOOKUP: RegExp          = /\$(\d+)/,
    _RG_LOOKUP_SIMPLE: RegExp   = /^\$\d+$/;

var RegGrp: HTMLElement = Collection.extend({
  constructor: function(values: string, ignoreCase: boolean) {
    this.base(values);
    this.ignoreCase = !!ignoreCase;
  },

  ignoreCase: false,

  exec: function(string: string, override: number) { // optimised (refers to _HASH/_KEYS)
    string += ""; // type-safe
    var items: object = this, keys: any[] = this[_KEYS];
    if (!keys.length) return string;
    if (override == RegGrp.IGNORE) override = 0;
    return string.replace(new RegExp(this, this.ignoreCase ? "gi" : "g"), function(match: any[]) {
      var item: any[], offset: number = 1, i: number = 0;
      // Loop through the RegGrp items.
      while ((item = items[_HASH + keys[i++]])) {
        var next: number = offset + item.length + 1;
        if (arguments[offset]) { // do we have a result?
          var replacement: string = override == null ? item.replacement : override;
          switch (typeof replacement) {
            case "function":
              return replacement.apply(items, _slice.call(arguments, offset, next));
            case "number":
              return arguments[offset + replacement];
            default:
              return replacement;
          }
        }
        offset = next;
      }
      return match;
    });
  },

  insertAt: function(index: number, expression: object, replacement: Function) {
    if (instanceOf(expression, RegExp)) {
      arguments[1] = expression.source;
    }
    return base(this, arguments);
  },

  test: function(string: string) {
    // The slow way to do it. Hopefully, this isn't called too often. :-)
    return this.exec(string) != string;
  },
  
  toString: function() {
    var offset: number = 1;
    return "(" + this.map(function(item: string) {
      // Fix back references.
      var expression: string = (item + "").replace(_RG_BACK_REF, function(match: Function, index: number) {
        return "\\" + (offset + Number(index));
      });
      offset += item.length + 1;
      return expression;
    }).join(")|(") + ")";
  }
}, {
  IGNORE: "$0",
  
  init: function() {
    forEach ("add,get,has,put,remove".split(","), function(name: string) {
      _override(this, name, function(expression: object) {
        if (instanceOf(expression, RegExp)) {
          arguments[0] = expression.source;
        }
        return base(this, arguments);
      });
    }, this.prototype);
  },
  
  Item: {
    constructor: function(expression: string, replacement: string) {
      if (replacement == null) replacement = RegGrp.IGNORE;
      else if (replacement.replacement != null) replacement = replacement.replacement;
      else if (typeof replacement != "function") replacement = String(replacement);
      
      // does the pattern use sub-expressions?
      if (typeof replacement == "string" && _RG_LOOKUP.test(replacement)) {
        // a simple lookup? (e.g. "$2")
        if (_RG_LOOKUP_SIMPLE.test(replacement)) {
          // store the index (used for fast retrieval of matched strings)
          replacement = parseInt(replacement.slice(1));
        } else { // a complicated lookup (e.g. "Hello $2 $1")
          // build a function to do the lookup
          // Improved version by Alexei Gorkov:
          var Q: string = '"';
          replacement = replacement
            .replace(/\\/g, "\\\\")
            .replace(/"/g, "\\x22")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\$(\d+)/g, Q + "+(arguments[$1]||" + Q+Q + ")+" + Q)
            .replace(/(['"])\1\+(.*)\+\1\1$/, "$1");
          replacement = new Function("return " + Q + replacement + Q);
        }
      }
      
      this.length = RegGrp.count(expression);
      this.replacement = replacement;
      this.toString = K(expression + "");
    },
    
    length: 0,
    replacement: ""
  },
  
  count: function(expression: string) {
    // Count the number of sub-expressions in a RegExp/RegGrp.Item.
    expression = (expression + "").replace(_RG_ESCAPE_CHARS, "").replace(_RG_ESCAPE_BRACKETS, "");
    return match(expression, _RG_BRACKETS).length;
  }
});

// =========================================================================
// lang/package.js
// =========================================================================

var lang: object = {
  name:      "lang",
  version:   base2.version,
  exports:   "assert,assertArity,assertType,base,bind,copy,extend,forEach,format,instanceOf,match,pcopy,rescape,trim,typeOf",
  namespace: "" // fixed later
};

// =========================================================================
// lang/assert.js
// =========================================================================

function assert(condition: boolean, message: string, ErrorClass: object): void {
  if (!condition) {
    throw new (ErrorClass || Error)(message || "Assertion failed.");
  }
};

function assertArity(args: any[], arity: number, message: string): void {
  if (arity == null) arity = args.callee.length;
  if (args.length < arity) {
    throw new SyntaxError(message || "Not enough arguments.");
  }
};

function assertType(object: object, type: string, message: string): void {
  if (type && (typeof type == "function" ? !instanceOf(object, type) : typeOf(object) != type)) {
    throw new TypeError(message || "Invalid type.");
  }
};

// =========================================================================
// lang/copy.js
// =========================================================================

function copy(object: object): object {
  // a quick copy
  var copy: object = {};
  for (var i in object) {
    copy[i] = object[i];
  }
  return copy;
};

function pcopy(object: object): string {
  // Doug Crockford / Richard Cornford
  _dummy.prototype = object;
  return new _dummy;
};

function _dummy(): void{};

// =========================================================================
// lang/extend.js
// =========================================================================

function base(object: object, args: Function): Promise {
  return object.base.apply(object, args);
};

function extend(object: object, source: object): object { // or extend(object, key, value)
  if (object && source) {
    if (arguments.length > 2) { // Extending with a key/value pair.
      var key: string = source;
      source = {};
      source[key] = arguments[2];
    }
    var proto: object = global[(typeof source == "function" ? "Function" : "Object")].prototype;
    // Add constructor, toString etc
    if (base2.__prototyping) {
      var i: number = _HIDDEN.length, key: string;
      while ((key = _HIDDEN[--i])) {
        var value: string = source[key];
        if (value != proto[key]) {
          if (_BASE.test(value)) {
            _override(object, key, value)
          } else {
            object[key] = value;
          }
        }
      }
    }
    // Copy each of the source object's properties to the target object.
    for (key in source) {
      if (proto[key] === undefined) {
        var value: string = source[key];
        // Object detection.
        if (key.charAt(0) == "@") {
          if (detect(key.slice(1))) extend(object, value);
        } else {
          // Check for method overriding.
          var ancestor: string = object[key];
          if (ancestor && typeof value == "function") {
            if (value != ancestor) {
              if (_BASE.test(value)) {
                _override(object, key, value);
              } else {
                value.ancestor = ancestor;
                object[key] = value;
              }
            }
          } else {
            object[key] = value;
          }
        }
      }
    }
  }
  return object;
};

function _ancestorOf(ancestor: string, fn: object): boolean {
  // Check if a function is in another function's inheritance chain.
  while (fn) {
    if (!fn.ancestor) return false;
    fn = fn.ancestor;
    if (fn == ancestor) return true;
  }
  return false;
};

function _override(object: object, name: string, method: Function): void {
  // Override an existing method.
  var ancestor: any[] = object[name];
  var superObject: object = base2.__prototyping; // late binding for prototypes
  if (superObject && ancestor != superObject[name]) superObject = null;
  function _base(): object {
    var previous: string = this.base;
    this.base = superObject ? superObject[name] : ancestor;
    var returnValue: any[] = method.apply(this, arguments);
    this.base = previous;
    return returnValue;
  };
  _base.method = method;
  _base.ancestor = ancestor;
  object[name] = _base;
  // introspection (removed when packed)
  ;;; _base.toString = K(method + "");
};

// =========================================================================
// lang/forEach.js
// =========================================================================

// http://dean.edwards.name/weblog/2006/07/enum/

if (typeof StopIteration == "undefined") {
  StopIteration = new Error("StopIteration");
}

function forEach(object: any[], block: string, context: string, fn: number): void {
  if (object == null) return;
  if (!fn) {
    if (typeof object == "function" && object.call) {
      // Functions are a special case.
      fn = Function;
    } else if (typeof object.forEach == "function" && object.forEach != arguments.callee) {
      // The object implements a custom forEach method.
      object.forEach(block, context);
      return;
    } else if (typeof object.length == "number") {
      // The object is array-like.
      _Array_forEach(object, block, context);
      return;
    }
  }
  _Function_forEach(fn || Object, object, block, context);
};

forEach.csv = function(string: string, block: any[], context: Function) {
  forEach (csv(string), block, context);
};

forEach.detect = function(object: object, block: Function, context: string) {
  forEach (object, function(value: string, key: string) {
    if (key.charAt(0) == "@") { // object detection
      if (detect(key.slice(1))) forEach (value, arguments.callee);
    } else block.call(context, value, key, object);
  });
};

// These are the two core enumeration methods. All other forEach methods
//  eventually call one of these two.

function _Array_forEach(array: any[], block: Function, context: string): void {
  if (array == null) array = global;
  var length: number = array.length || 0, i: number; // preserve length
  if (typeof array == "string") {
    for (i = 0; i < length; i++) {
      block.call(context, array.charAt(i), i, array);
    }
  } else { // Cater for sparse arrays.
    for (i = 0; i < length; i++) {    
    /*@cc_on @*/
    /*@if (@_jscript_version < 5.2)
      if ($Legacy.has(array, i))
    @else @*/
      if (i in array)
    /*@end @*/
        block.call(context, array[i], i, array);
    }
  }
};

function _Function_forEach(fn: string, object: object, block: string, context: string): void {
  // http://code.google.com/p/base2/issues/detail?id=10
  
  // Run the test for Safari's buggy enumeration.
  var Temp: Function = function(){this.i=1};
  Temp.prototype = {i:1};
  var count: number = 0;
  for (var i in new Temp) count++;
  
  // Overwrite the main function the first time it is called.
  _Function_forEach = (count > 1) ? function(fn: Function, object: object, block: Function, context: string) {
    // Safari fix (pre version 3)
    var processed: object = {};
    for (var key in object) {
      if (!processed[key] && fn.prototype[key] === undefined) {
        processed[key] = true;
        block.call(context, object[key], key, object);
      }
    }
  } : function(fn: Function, object: object, block: Function, context: string) {
    // Enumerate an object and compare its keys with fn's prototype.
    for (var key in object) {
      if (fn.prototype[key] === undefined) {
        block.call(context, object[key], key, object);
      }
    }
  };
  
  _Function_forEach(fn, object, block, context);
};

// =========================================================================
// lang/instanceOf.js
// =========================================================================

function instanceOf(object: object, klass: Function): boolean {
  // Handle exceptions where the target object originates from another frame.
  // This is handy for JSON parsing (amongst other things).
  
  if (typeof klass != "function") {
    throw new TypeError("Invalid 'instanceOf' operand.");
  }

  if (object == null) return false;
  
  /*@cc_on  
  // COM objects don't have a constructor
  if (typeof object.constructor != "function") {
    return typeOf(object) == typeof klass.prototype.valueOf();
  }
  @*/
    if (object.constructor == klass) return true;
    if (klass.ancestorOf) return klass.ancestorOf(object.constructor);
  /*@if (@_jscript_version < 5.1)
    // do nothing
  @else @*/
    if (object instanceof klass) return true;
  /*@end @*/

  // If the class is a base2 class then it would have passed the test above.
  if (Base.ancestorOf == klass.ancestorOf) return false;
  
  // base2 objects can only be instances of Object.
  if (Base.ancestorOf == object.constructor.ancestorOf) return klass == Object;
  
  switch (klass) {
    case Array: // This is the only troublesome one.
      return !!(typeof object == "object" && object.join && object.splice);
    case Function:
      return typeOf(object) == "function";
    case RegExp:
      return typeof object.constructor.$1 == "string";
    case Date:
      return !!object.getTimezoneOffset;
    case String:
    case Number:
    case Boolean:
      return typeOf(object) == typeof klass.prototype.valueOf();
    case Object:
      return true;
  }
  
  return false;
};

// =========================================================================
// lang/typeOf.js
// =========================================================================

// http://wiki.ecmascript.org/doku.php?id=proposals:typeof

function typeOf(object: object): string {
  var type: string = typeof object;
  switch (type) {
    case "object":
      return object == null
        ? "null"
        : typeof object.constructor == "undefined" // COM object
          ? _MSIE_NATIVE_FUNCTION.test(object)
            ? "function"
            : type
          : typeof object.constructor.prototype.valueOf(); // underlying type
    case "function":
      return typeof object.call == "function" ? type : "object";
    default:
      return type;
  }
};

// =========================================================================
// JavaScript/package.js
// =========================================================================

var JavaScript: object = {
  name:      "JavaScript",
  version:   base2.version,
  exports:   "Array2,Date2,Function2,String2",
  namespace: "", // fixed later
  
  bind: function(host: object) {
    var top: Function = global;
    global = host;
    forEach.csv(this.exports, function(name2: string) {
      var name: string = name2.slice(0, -1);
      extend(host[name], this[name2]);
      this[name2](host[name].prototype); // cast
    }, this);
    global = top;
    return host;
  }
};

function _createObject2(Native: object, constructor: Function, generics: string, extensions: Function): Error {
  // Clone native objects and extend them.

  // Create a Module that will contain all the new methods.
  var INative: object = Module.extend();
  var id: string = INative.toString().slice(1, -1);
  // http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6#Array_and_String_generics
  forEach.csv(generics, function(name: string) {
    INative[name] = unbind(Native.prototype[name]);
    INative.namespace += format("var %1=%2.%1;", name, id);
  });
  forEach (_slice.call(arguments, 3), INative.implement, INative);

  // create a faux constructor that augments the native object
  var Native2: HTMLElement = function() {
    return INative(this.constructor == INative ? constructor.apply(null, arguments) : arguments[0]);
  };
  Native2.prototype = INative.prototype;

  // Remove methods that are already implemented.
  for (var name in INative) {
    if (name != "prototype" && Native[name]) {
      INative[name] = Native[name];
      delete INative.prototype[name];
    }
    Native2[name] = INative[name];
  }
  Native2.ancestor = Object;
  delete Native2.extend;
  
  // remove "lang.bind.."
  Native2.namespace = Native2.namespace.replace(/(var (\w+)=)[^,;]+,([^\)]+)\)/g, "$1$3.$2");
  
  return Native2;
};

// =========================================================================
// JavaScript/~/Date.js
// =========================================================================

// Fix Date.get/setYear() (IE5-7)

if ((new Date).getYear() > 1900) {
  Date.prototype.getYear = function() {
    return this.getFullYear() - 1900;
  };
  Date.prototype.setYear = function(year: string) {
    return this.setFullYear(year + 1900);
  };
}

// https://bugs.webkit.org/show_bug.cgi?id=9532

var _testDate: HTMLInputElement = new Date(Date.UTC(2006, 1, 20));
_testDate.setUTCDate(15);
if (_testDate.getUTCHours() != 0) {
  forEach.csv("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds", function(type: string) {
    extend(Date.prototype, "setUTC" + type, function() {
      var value: number = base(this, arguments);
      if (value >= 57722401000) {
        value -= 3600000;
        this.setTime(value);
      }
      return value;
    });
  });
}

// =========================================================================
// JavaScript/~/Function.js
// =========================================================================

// Some browsers don't define this.

Function.prototype.prototype = {};

// =========================================================================
// JavaScript/~/String.js
// =========================================================================

// A KHTML bug.

if ("".replace(/^/, K("$$")) == "$") {
  extend(String.prototype, "replace", function(expression: string, replacement: Function) {
    if (typeof replacement == "function") {
      var fn: Function = replacement;
      replacement = function() {
        return String(fn.apply(null, arguments)).split("$").join("$$");
      };
    }
    return this.base(expression, replacement);
  });
}

// =========================================================================
// JavaScript/Array2.js
// =========================================================================

var Array2: Function = _createObject2(
  Array,
  Array,
  "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", // generics
  Enumerable, {
    combine: function(keys: object, values: object) {
      // Combine two arrays to make a hash.
      if (!values) values = keys;
      return Array2.reduce(keys, function(hash: object, key: string, index: number) {
        hash[key] = values[index];
        return hash;
      }, {});
    },

    contains: function(array: any[], item: string) {
      return Array2.indexOf(array, item) != -1;
    },

    copy: function(array: any[]) {
      var copy: object = _slice.call(array);
      if (!copy.swap) Array2(copy); // cast to Array2
      return copy;
    },

    flatten: function(array: any[]) {
      var i: number = 0;
      return Array2.reduce(array, function(result: object, item: any[]) {
        if (Array2.like(item)) {
          Array2.reduce(item, arguments.callee, result);
        } else {
          result[i++] = item;
        }
        return result;
      }, []);
    },
    
    forEach: _Array_forEach,
    
    indexOf: function(array: any[], item: number, fromIndex: number) {
      var length: number = array.length;
      if (fromIndex == null) {
        fromIndex = 0;
      } else if (fromIndex < 0) {
        fromIndex = Math.max(0, length + fromIndex);
      }
      for (var i = fromIndex; i < length; i++) {
        if (array[i] === item) return i;
      }
      return -1;
    },
    
    insertAt: function(array: any[], index: number, item: string) {
      Array2.splice(array, index, 0, item);
      return item;
    },
    
    item: function(array: any[], index: number) {
      if (index < 0) index += array.length; // starting from the end
      return array[index];
    },
    
    lastIndexOf: function(array: any[], item: number, fromIndex: number) {
      var length: number = array.length;
      if (fromIndex == null) {
        fromIndex = length - 1;
      } else if (fromIndex < 0) {
        fromIndex = Math.max(0, length + fromIndex);
      }
      for (var i = fromIndex; i >= 0; i--) {
        if (array[i] === item) return i;
      }
      return -1;
    },
  
    map: function(array: any[], block: Function, context: string) {
      var result: Promise = [];
      Array2.forEach (array, function(item: string, index: number) {
        result[index] = block.call(context, item, index, array);
      });
      return result;
    },

    remove: function(array: any[], item: string) {
      var index: number = Array2.indexOf(array, item);
      if (index != -1) Array2.removeAt(array, index);
    },

    removeAt: function(array: any[], index: number) {
      Array2.splice(array, index, 1);
    },

    swap: function(array: any[], index1: number, index2: number) {
      if (index1 < 0) index1 += array.length; // starting from the end
      if (index2 < 0) index2 += array.length;
      var temp: string = array[index1];
      array[index1] = array[index2];
      array[index2] = temp;
      return array;
    }
  }
);

Array2.reduce = Enumerable.reduce; // Mozilla does not implement the thisObj argument

Array2.like = function(object: any[]) {
  // is the object like an array?
  return typeOf(object) == "object" && typeof object.length == "number";
};

// introspection (removed when packed)
;;; Enumerable["#implemented_by"].pop();
;;; Enumerable["#implemented_by"].push(Array2);

// =========================================================================
// JavaScript/Date2.js
// =========================================================================

// http://developer.mozilla.org/es4/proposals/date_and_time.html

// big, ugly, regular expression
var _DATE_PATTERN: RegExp = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;  
var _DATE_PARTS: object = { // indexes to the sub-expressions of the RegExp above
  FullYear: 2,
  Month: 4,
  Date: 6,
  Hours: 8,
  Minutes: 10,
  Seconds: 12,
  Milliseconds: 14
};
var _TIMEZONE_PARTS: object = { // idem, but without the getter/setter usage on Date object
  Hectomicroseconds: 15, // :-P
  UTC: 16,
  Sign: 17,
  Hours: 18,
  Minutes: 20
};

var _TRIM_ZEROES: RegExp   = /(((00)?:0+)?:0+)?\.0+$/;
var _TRIM_TIMEZONE: RegExp = /(T[0-9:.]+)$/;

var Date2: HTMLElement = _createObject2(
  Date, 
  function(yy: string, mm: number, dd: number, h: number, m: string, s: string, ms: boolean) {
    switch (arguments.length) {
      case 0: return new Date;
      case 1: return typeof yy == "number" ? new Date(yy) : Date2.parse(yy);
      default: return new Date(yy, mm, arguments.length == 2 ? 1 : dd, h || 0, m || 0, s || 0, ms || 0);
    }
  }, "", {
    toISOString: function(date: object) {
      var string: string = "####-##-##T##:##:##.###";
      for (var part in _DATE_PARTS) {
        string = string.replace(/#+/, function(digits: any[]) {
          var value: number = date["getUTC" + part]();
          if (part == "Month") value++; // js month starts at zero
          return ("000" + value).slice(-digits.length); // pad
        });
      }
      // remove trailing zeroes, and remove UTC timezone, when time's absent
      return string.replace(_TRIM_ZEROES, "").replace(_TRIM_TIMEZONE, "$1Z");
    }
  }
);

delete Date2.forEach;

Date2.now = function() {
  return (new Date).valueOf(); // milliseconds since the epoch
};

Date2.parse = function(string: number, defaultDate: HTMLElement) {
  if (arguments.length > 1) {
    assertType(defaultDate, "number", "default date should be of type 'number'.")
  }
  // parse ISO date
  var parts: object = match(string, _DATE_PATTERN);
  if (parts.length) {
    if (parts[_DATE_PARTS.Month]) parts[_DATE_PARTS.Month]--; // js months start at zero
    // round milliseconds on 3 digits
    if (parts[_TIMEZONE_PARTS.Hectomicroseconds] >= 5) parts[_DATE_PARTS.Milliseconds]++;
    var date: HTMLInputElement = new Date(defaultDate || 0);
    var prefix: string = parts[_TIMEZONE_PARTS.UTC] || parts[_TIMEZONE_PARTS.Hours] ? "UTC" : "";
    for (var part in _DATE_PARTS) {
      var value: string = parts[_DATE_PARTS[part]];
      if (!value) continue; // empty value
      // set a date part
      date["set" + prefix + part](value);
      // make sure that this setting does not overflow
      if (date["get" + prefix + part]() != parts[_DATE_PARTS[part]]) {
        return NaN;
      }
    }
    // timezone can be set, without time being available
    // without a timezone, local timezone is respected
    if (parts[_TIMEZONE_PARTS.Hours]) {
      var hours: number = Number(parts[_TIMEZONE_PARTS.Sign] + parts[_TIMEZONE_PARTS.Hours]);
      var minutes: number = Number(parts[_TIMEZONE_PARTS.Sign] + (parts[_TIMEZONE_PARTS.Minutes] || 0));
      date.setUTCMinutes(date.getUTCMinutes() + (hours * 60) + minutes);
    } 
    return date.valueOf();
  } else {
    return Date.parse(string);
  }
};

// =========================================================================
// JavaScript/String2.js
// =========================================================================

var String2: any[] = _createObject2(
  String, 
  function(string: string) {
    return new String(arguments.length == 0 ? "" : string);
  },
  "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase",
  {
    csv: csv,
    format: format,
    rescape: rescape,
    trim: trim
  }
);

delete String2.forEach;

// http://blog.stevenlevithan.com/archives/faster-trim-javascript
function trim(string: string): string {
  return String(string).replace(_LTRIM, "").replace(_RTRIM, "");
};

function csv(string: number): any[] {
  return string ? (string + "").split(/\s*,\s*/) : [];
};

function format(string: string): string {
  // Replace %n with arguments[n].
  // e.g. format("%1 %2%3 %2a %1%3", "she", "se", "lls");
  // ==> "she sells sea shells"
  // Only %1 - %9 supported.
  var args: HTMLElement = arguments;
  var pattern: Function = new RegExp("%([1-" + (arguments.length - 1) + "])", "g");
  return (string + "").replace(pattern, function(match: Function, index: number) {
    return args[index];
  });
};

function match(string: string, expression: Function): boolean {
  // Same as String.match() except that this function will return an empty
  // array if there is no match.
  return (string + "").match(expression) || [];
};

function rescape(string: string): string {
  // Make a string safe for creating a RegExp.
  return (string + "").replace(_RESCAPE, "\\$1");
};

// =========================================================================
// JavaScript/Function2.js
// =========================================================================

var Function2: any[] = _createObject2(
  Function,
  Function,
  "", {
    I: I,
    II: II,
    K: K,
    bind: bind,
    compose: compose,
    delegate: delegate,
    flip: flip,
    not: not,
    partial: partial,
    unbind: unbind
  }
);

function I(i: string): string { // return first argument
  return i;
};

function II(i: string, ii: Function): string { // return second argument
  return ii;
};

function K(k: number): Function {
  return function() {
    return k;
  };
};

function bind(fn: string, context: object): Function {
  var lateBound: boolean = typeof fn != "function";
  if (arguments.length > 2) {
    var args: Map = _slice.call(arguments, 2);
    return function() {
      return (lateBound ? context[fn] : fn).apply(context, args.concat.apply(args, arguments));
    };
  } else { // faster if there are no additional arguments
    return function() {
      return (lateBound ? context[fn] : fn).apply(context, arguments);
    };
  }
};

function compose(): Function {
  var fns: any[] = _slice.call(arguments);
  return function() {
    var i: number = fns.length, result: any[] = fns[--i].apply(this, arguments);
    while (i--) result = fns[i].call(this, result);
    return result;
  };
};

function delegate(fn: Function, context: Function): Function {
  return function() {
    var args: any[] = _slice.call(arguments);
    args.unshift(this);
    return fn.apply(context, args);
  };
};

function flip(fn: Function): Function {
  return function() {
    return fn.apply(this, Array2.swap(arguments, 0, 1));
  };
};

function not(fn: Function): Function {
  return function() {
    return !fn.apply(this, arguments);
  };
};

function partial(fn: Function): Function {
  var args: any[] = _slice.call(arguments, 1);
  // based on Oliver Steele's version
  return function() {
    var specialised: any[] = args.concat(), i: number = 0, j: number = 0;
    while (i < args.length && j < arguments.length) {
      if (specialised[i] === undefined) specialised[i] = arguments[j++];
      i++;
    }
    while (j < arguments.length) {
      specialised[i++] = arguments[j++];
    }
    if (Array2.contains(specialised, undefined)) {
      specialised.unshift(fn);
      return partial.apply(null, specialised);
    }
    return fn.apply(this, specialised);
  };
};

function unbind(fn: Function): Function {
  return function(context: Function) {
    return fn.apply(context, _slice.call(arguments, 1));
  };
};

// =========================================================================
// base2/detect.js
// =========================================================================

function detect(): string {
  // Two types of detection:
  //  1. Object detection
  //    e.g. detect("(java)");
  //    e.g. detect("!(document.addEventListener)");
  //  2. Platform detection (browser sniffing)
  //    e.g. detect("MSIE");
  //    e.g. detect("MSIE|opera");

  var jscript: number = NaN/*@cc_on||@_jscript_version@*/; // http://dean.edwards.name/weblog/2007/03/sniff/#comment85164
  var javaEnabled: boolean = global.java ? true : false;
  if (global.navigator) { // browser
    var MSIE: RegExp = /MSIE[\d.]+/g;
    var element: Error = document.createElement("span");
    // Close up the space between name and version number.
    //  e.g. MSIE 6 -> MSIE6
    var userAgent: string = navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
    // Fix opera's (and others) user agent string.
    if (!jscript) userAgent = userAgent.replace(MSIE, "");
    if (MSIE.test(userAgent)) userAgent = userAgent.match(MSIE)[0] + " " + userAgent.replace(MSIE, "");
    base2.userAgent = navigator.platform + " " + userAgent.replace(/like \w+/gi, "");
    javaEnabled &= navigator.javaEnabled();
//} else if (java) { // rhino
//  var System = java.lang.System;
//  base2.userAgent = "Rhino " + System.getProperty("os.arch") + " " + System.getProperty("os.name") + " " + System.getProperty("os.version");
//} else if (jscript) { // Windows Scripting Host
//  base2.userAgent = "WSH";
  }

  var _cache: object = {};
  detect = function(expression: string) {
    if (_cache[expression] == null) {
      var returnValue: boolean = false, test: string = expression;
      var not: boolean = test.charAt(0) == "!";
      if (not) test = test.slice(1);
      if (test.charAt(0) == "(") {
        try {
          returnValue = new Function("element,jscript,java,global", "return !!" + test)(element, jscript, javaEnabled, global);
        } catch (ex) {
          // the test failed
        }
      } else {
        // Browser sniffing.
        returnValue = new RegExp("(" + test + ")", "i").test(base2.userAgent);
      }
      _cache[expression] = !!(not ^ returnValue);
    }
    return _cache[expression];
  };
  
  return detect(arguments[0]);
};

// =========================================================================
// base2/init.js
// =========================================================================

base2 = global.base2 = new Package(this, base2);
var exports: string = this.exports;

lang = new Package(this, lang);
exports += this.exports;

JavaScript = new Package(this, JavaScript);
eval(exports + this.exports);

lang.base = base;
lang.extend = extend;

}); ////////////////////  END: CLOSURE  /////////////////////////////////////
