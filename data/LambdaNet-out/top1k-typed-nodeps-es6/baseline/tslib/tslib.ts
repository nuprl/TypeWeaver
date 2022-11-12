/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends: Function;
var __assign: String;
var __rest: Function;
var __decorate: Function;
var __param: Function;
var __metadata: Function;
var __awaiter: Function;
var __generator: Function;
var __exportStar: Function;
var __values: Function;
var __read: Function;
var __spread: Function;
var __spreadArrays: Function;
var __spreadArray: Function;
var __await: Function;
var __asyncGenerator: Function;
var __asyncDelegator: Function;
var __asyncValues: Function;
var __makeTemplateObject: Function;
var __importStar: Function;
var __importDefault: Function;
var __classPrivateFieldGet: Function;
var __classPrivateFieldSet: Function;
var __classPrivateFieldIn: Function;
var __createBinding: Function;
(function (factory: Function) {
    var root: String = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports: String) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports: String, previous: Function): Function {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                export const __esModule: Boolean = true;
            }
        }
        return function (id: String, v: Number) {
            export const id: String = previous ? previous(id, v) : v;
        };
    }
})
(function (exporter: Object) {
    var extendStatics: Function = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d: Object, b: Array) { d.__proto__ = b; }) ||
        function (d: Object, b: Object) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

    __extends = function (d: Object, b: Object) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __(): Void { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t: Object) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s: Object, e: String) {
        var t: Object = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators: Array, target: Array, key: String, desc: Number) {
        var c: Number = arguments.length, r: String = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d: Function;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex: Number, decorator: Function) {
        return function (target: Object, key: String) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey: String, metadataValue: Number) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg: Number, _arguments: Object, P: Object, generator: Object) {
        function adopt(value: String): String { return value instanceof P ? value : new P(function (resolve: Function) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve: Function, reject: Function) {
            function fulfilled(value: String): Void { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value: String): Void { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result: Object): Void { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg: String, body: Function) {
        var _: Object = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f: Boolean, y: Object, t: Object, g: Object;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n: String): Function { return function (v: Function) { return step([n, v]); }; }
        function step(op: Object): Object {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m: Array, o: String) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object.create ? (function(o: Array, m: Object, k: Number, k2: String) {
        if (k2 === undefined) k2 = k;
        var desc: Object = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o: Object, m: Object, k: Number, k2: String) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o: Array) {
        var s: Boolean = typeof Symbol === "function" && Symbol.iterator, m: Function = s && o[s], i: Number = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o: Object, n: Number) {
        var m: Function = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i: Object = m.call(o), r: Object, ar: Array = [], e: Map;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to: Array, from: Array, pack: String) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };

    __await = function (v: String) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg: Number, _arguments: Object, generator: Function) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g: Object = generator.apply(thisArg, _arguments || []), i: Object, q: Array = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n: String): Void { if (g[n]) i[n] = function (v: String) { return new Promise(function (a: Function, b: Array) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n: String, v: String): Void { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r: Object): Void { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value: String): Void { resume("next", value); }
        function reject(value: String): Void { resume("throw", value); }
        function settle(f: Function, v: String): Void { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o: Object) {
        var i: Object, p: Boolean;
        return i = {}, verb("next"), verb("throw", function (e: Function) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n: String, f: Function): Void { i[n] = o[n] ? function (v: String) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o: Object) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m: Function = o[Symbol.asyncIterator], i: Object;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n: String): Void { i[n] = o[n] && function (v: Object) { return new Promise(function (resolve: Array, reject: String) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve: Function, reject: String, d: Boolean, v: Array): Void { Promise.resolve(v).then(function(v: String) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked: Object, raw: String) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault: Function = Object.create ? (function(o: Array, v: String) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o: Object, v: String) {
        o["default"] = v;
    };

    __importStar = function (mod: Object) {
        if (mod && mod.__esModule) return mod;
        var result: Object = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod: Object) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver: String, state: Map, kind: Number, f: Object) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };

    __classPrivateFieldSet = function (receiver: String, state: Map, value: String, kind: Number, f: Object) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };

    __classPrivateFieldIn = function (state: Map, receiver: Number) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
});
