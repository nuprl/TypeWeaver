export default extractICSS;
/**
 *
 * @param {string} css
 * @param {boolean} removeRules
 * @param {'auto' | 'rule' | 'at-rule'} mode
 */
declare function extractICSS(css: string, removeRules?: boolean, mode?: 'auto' | 'rule' | 'at-rule'): {
    icssImports: {};
    icssExports: {};
};
