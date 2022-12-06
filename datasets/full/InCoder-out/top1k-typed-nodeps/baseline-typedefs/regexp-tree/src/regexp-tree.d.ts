declare const compatTranspiler: any;
declare const generator: any;
declare const optimizer: any;
declare const parser: any;
declare const transform: any;
declare const traverse: any;
declare const fa: any;
declare const RegExpTree: any;
declare const regexpTree: {
    parser: any;
    fa: any;
    TransformResult: any;
    parse(regexp: any, options: any): any;
    traverse(ast: any, handlers: any, options: any): any;
    transform(regexp: any, handlers: any): any;
    generate(ast: any): any;
    toRegExp(regexp: any): RegExp;
    optimize(regexp: any, whitelist: any, { blacklist }?: {
        blacklist: any;
    }): any;
    compatTranspile(regexp: any, whitelist: any): any;
    exec(re: any, string: any): any;
};
