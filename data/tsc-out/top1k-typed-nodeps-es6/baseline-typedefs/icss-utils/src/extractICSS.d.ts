export default extractICSS;
declare function extractICSS(css: string, removeRules?: boolean, mode?: 'auto' | 'rule' | 'at-rule'): {
    icssImports: {};
    icssExports: {};
};
