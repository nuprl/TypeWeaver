declare const _default: {
    replaceValueSymbols: (value: any, replacements: any) => any;
    replaceSymbols: (css: any, replacements: any) => void;
    extractICSS: (css: any, removeRules?: boolean, mode?: string) => {
        icssImports: {};
        icssExports: {};
    };
    createICSSRules: (imports: any, exports: any, postcss: any, mode: any) => any[];
};
export default _default;
