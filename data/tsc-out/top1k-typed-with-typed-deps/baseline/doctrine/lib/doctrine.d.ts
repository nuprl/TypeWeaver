export const Syntax: {};
export namespace type {
    import Syntax = Syntax;
    export { Syntax };
    export const parseType: (src: any, opt: any) => any;
    export const parseParamType: (src: any, opt: any) => any;
    export const stringify: (node: any, options: any) => any;
}
export function unwrapComment(doc: any): any;
declare namespace __lib_doctrine_ { }
export { VERSION as version, parseType, parseParamType, DoctrineError as Error };
