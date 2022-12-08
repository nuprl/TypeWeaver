declare const colors: any;
declare const parse: any;
declare const color: (arr: any, c: any) => any;
declare const cp: any;
declare const braces: {
    (input: any, options?: {}): any[];
    parse(input: any, options?: {}): any;
    stringify(input: any, options?: {}): any;
    compile(input: any, options?: {}): any;
    expand(input: any, options?: {}): any;
    create(input: any, options?: {}): any;
};
declare const fixture = "a{,b}c";
