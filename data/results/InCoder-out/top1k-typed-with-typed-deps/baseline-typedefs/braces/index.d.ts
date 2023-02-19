declare const stringify: any;
declare const compile: any;
declare const expand: any;
declare const parse: any;
declare const braces: {
    (input: any, options?: {}): any[];
    parse(input: any, options?: {}): any;
    stringify(input: any, options?: {}): any;
    compile(input: any, options?: {}): any;
    expand(input: any, options?: {}): any;
    create(input: any, options?: {}): any;
};
