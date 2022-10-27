var indexOf: number = function (xs: any, item: any) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys: any = function (obj: any) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res: any[] = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach: void = function (xs: any, fn: any) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp: void = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj: any, name: string, value: any) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj: any, name: string, value: any) {
            obj[name] = value;
        };
    }
}());

var globals: string[] = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context(): void {}
Context.prototype = {};

var Script: any = exports.Script = function NodeScript (code: string): any {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context: Context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe: HTMLIFrameElement = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win: Window = iframe.contentWindow;
    var wEval: any = win.eval, wExecScript = win.execScript;

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
    
    var winKeys: any = Object_keys(win);

    var res: any = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key: any) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key: any) {
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

Script.prototype.runInNewContext = function (context: any) {
    var ctx: any = Script.createContext(context);
    var res: any = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key: string) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name: any) {
    export const name: any = Script[name] = function (code: string) {
        var s: any = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

export const isContext: boolean = function (context: any) {
    return context instanceof Context;
};

export const createScript: any = function (code: number) {
    return Script(code);
};

export const createContext: any = Script.createContext = function (context: Context) {
    var copy: any = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key: string) {
            copy[key] = context[key];
        });
    }
    return copy;
};
