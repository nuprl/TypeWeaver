declare const createMacro: any, MacroError: any;
declare const dedent: any;
declare function prevalMacros({ references, state, babel }: {
    references: any;
    state: any;
    babel: any;
}): void;
declare function asTag(quasiPath: any, { file: { opts: { filename } } }: {
    file: {
        opts: {
            filename: any;
        };
    };
}, babel: any): void;
declare function asFunction(argumentsPaths: any, { file: { opts: { filename } } }: {
    file: {
        opts: {
            filename: any;
        };
    };
}, babel: any): void;
