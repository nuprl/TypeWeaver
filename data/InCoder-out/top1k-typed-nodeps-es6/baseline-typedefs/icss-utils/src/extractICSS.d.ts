declare const extractICSS: (css: any, removeRules?: boolean, mode?: string) => {
    icssImports: {};
    icssExports: {};
};
export default extractICSS;
