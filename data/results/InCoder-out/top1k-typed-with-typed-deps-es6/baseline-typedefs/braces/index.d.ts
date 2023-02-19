declare const braces: {
    (input: any, options?: {}): any[];
    parse(input: any, options?: {}): {
        type: string;
        input: string;
        nodes: any[];
    };
    stringify(input: any, options?: {}): any;
    compile(input: any, options?: {}): any;
    expand(input: any, options?: {}): any;
    create(input: any, options?: {}): any;
};
export default braces;
