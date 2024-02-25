/// <reference types="node" />
declare function _exports(types: any, shorthands: any, args: any, slice: any): {
    argv: {
        remain: any[];
        cooked: any;
        original: any;
    };
};
declare namespace _exports {
    export { clean };
    export namespace typeDefs {
        namespace String {
            export const type: StringConstructor;
            export { validateString as validate };
        }
        namespace Boolean {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            export { validateBoolean as validate };
        }
        namespace url {
            export { url as type };
            export { validateUrl as validate };
        }
        namespace Number {
            const type_2: NumberConstructor;
            export { type_2 as type };
            export { validateNumber as validate };
        }
        namespace path {
            export { path as type };
            export { validatePath as validate };
        }
        namespace Stream {
            export { Stream as type };
            export { validateStream as validate };
        }
        namespace Date {
            const type_3: DateConstructor;
            export { type_3 as type };
            export { validateDate as validate };
        }
    }
}
export = _exports;
declare function clean(data: any, types: any, typeDefs: any): void;
declare function validateString(data: any, k: any, val: any): void;
declare function validateBoolean(data: any, k: any, val: any): void;
import url_1 = require("url");
declare function validateUrl(data: any, k: any, val: any): boolean;
declare function validateNumber(data: any, k: any, val: any): boolean;
import path_1 = require("path");
declare function validatePath(data: any, k: any, val: any): boolean;
import Stream_1_1 = require("stream");
import Stream_1 = Stream_1_1.Stream;
declare function validateStream(data: any, k: any, val: any): boolean;
declare function validateDate(data: any, k: any, val: any): boolean;
