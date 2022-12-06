declare const Suite: any;
declare const colors: any;
declare const argv: any;
declare const fill60: any;
declare const fill70: any;
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
