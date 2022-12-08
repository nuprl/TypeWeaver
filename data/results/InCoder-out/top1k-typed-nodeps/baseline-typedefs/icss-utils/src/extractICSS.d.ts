declare const importPattern: RegExp;
declare const balancedQuotes: RegExp;
declare const getDeclsObject: (rule: any) => {};
declare const extractICSS: (css: any, removeRules?: boolean, mode?: string) => {
    icssImports: {};
    icssExports: {};
};
