declare const Suite: any;
declare const colors: any;
declare const argv: any;
declare const minimatch: any;
declare const braces: {
    (input: any, options?: {}): any[];
    parse(input: any, options?: {}): any;
    stringify(input: any, options?: {}): any;
    compile(input: any, options?: {}): any;
    expand(input: any, options?: {}): any;
    create(input: any, options?: {}): any;
};
declare const cycle: (e: any, newline: any) => void;
declare const bench: {
    (name: any, options: any): any;
    skip(name: any): {
        (): void;
        add(): any;
        run(): any;
    };
};
declare const skip: {
    (): void;
    add(): any;
    run(): any;
};
