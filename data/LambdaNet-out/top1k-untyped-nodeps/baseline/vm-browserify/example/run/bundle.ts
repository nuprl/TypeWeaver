(function(){function r(e: object,n: object,t: any[]): Function{function o(i: string,f: boolean): string{if(!n[i]){if(!e[i]){var c: Function="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a: Error=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p: object=n[i]={exports:{}};e[i][0].call(p.exports,function(r: string){var n: string=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require: Function,module: Function,exports: object){
var indexOf: Function = function (xs: string, item: string) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys: Function = function (obj: any[]) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res: any[] = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach: Function = function (xs: any[], fn: Function) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp: Function = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj: Function, name: string, value: string) {
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

var globals: any[] = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context(): void {}
Context.prototype = {};

var Script: object = exports.Script = function NodeScript (code: string): string {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context: object) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe: Error = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win: object = iframe.contentWindow;
    var wEval: Function = win.eval, wExecScript: Function = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key: string) {
        win[key] = context[key];
    });
    forEach(globals, function (key: string) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys: string = Object_keys(win);

    var res: any[] = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key: string) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key: string) {
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

Script.prototype.runInNewContext = function (context: object) {
    var ctx: object = Script.createContext(context);
    var res: Promise = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key: string) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name: string) {
    exports[name] = Script[name] = function (code: string) {
        var s: object = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context: string) {
    return context instanceof Context;
};

exports.createScript = function (code: string) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context: object) {
    var copy: object = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key: string) {
            copy[key] = context[key];
        });
    }
    return copy;
};

},{}],2:[function(require: Function,module: Function,exports: number){
var vm: void = require('vm');

window.addEventListener('load', function () {
    var res: number = vm.runInNewContext('a + 5', { a : 100 });
    document.querySelector('#res').textContent = res;
});

},{"vm":1}]},{},[2]);
