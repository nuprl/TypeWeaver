(function(){function r(e: Object,n: Object,t: Array): Function{function o(i: String,f: Boolean): String{if(!n[i]){if(!e[i]){var c: Function="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a: Error=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p: Object=n[i]={exports:{}};e[i][0].call(p.exports,function(r: String){var n: String=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require: Function,module: Function,exports: Object){
var indexOf: Function = function (xs: String, item: String) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys: Function = function (obj: Array) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res: Array = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach: Function = function (xs: Array, fn: Function) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp: Function = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj: Function, name: String, value: String) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals: Array = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context(): Void {}
Context.prototype = {};

var Script: Object = exports.Script = function NodeScript (code: String): String {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context: Object) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe: Error = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win: Object = iframe.contentWindow;
    var wEval: Function = win.eval, wExecScript: Function = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key: String) {
        win[key] = context[key];
    });
    forEach(globals, function (key: String) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys: String = Object_keys(win);

    var res: Array = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key: String) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key: String) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context: Object) {
    var ctx: Object = Script.createContext(context);
    var res: Promise = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key: String) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name: String) {
    exports[name] = Script[name] = function (code: String) {
        var s: Object = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context: String) {
    return context instanceof Context;
};

exports.createScript = function (code: String) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context: Object) {
    var copy: Object = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key: String) {
            copy[key] = context[key];
        });
    }
    return copy;
};

},{}],2:[function(require: Function,module: Function,exports: Number){
var vm: Void = require('vm');

window.addEventListener('load', function () {
    var res: Number = vm.runInNewContext('a + 5', { a : 100 });
    document.querySelector('#res').textContent = res;
});

},{"vm":1}]},{},[2]);
