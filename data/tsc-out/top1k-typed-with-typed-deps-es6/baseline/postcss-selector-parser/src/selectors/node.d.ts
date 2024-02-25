export default class Node {
    constructor(opts?: {});
    spaces: {};
    remove(): Node;
    parent: any;
    replaceWith(...args: any[]): Node;
    next(): any;
    prev(): any;
    clone(overrides?: {}): any;
    /**
     * Some non-standard syntax doesn't follow normal escaping rules for css.
     * This allows non standard syntax to be appended to an existing property
     * by specifying the escaped value. By specifying the escaped value,
     * illegal characters are allowed to be directly inserted into css output.
     * @param {string} name the property to set
     * @param {any} value the unescaped value of the property
     * @param {string} valueEscaped optional. the escaped value of the property.
     */
    appendToPropertyAndEscape(name: string, value: any, valueEscaped: string): void;
    raws: {};
    /**
     * Some non-standard syntax doesn't follow normal escaping rules for css.
     * This allows the escaped value to be specified directly, allowing illegal
     * characters to be directly inserted into css output.
     * @param {string} name the property to set
     * @param {any} value the unescaped value of the property
     * @param {string} valueEscaped the escaped value of the property.
     */
    setPropertyAndEscape(name: string, value: any, valueEscaped: string): void;
    /**
     * When you want a value to passed through to CSS directly. This method
     * deletes the corresponding raw value causing the stringifier to fallback
     * to the unescaped value.
     * @param {string} name the property to set.
     * @param {any} value The value that is both escaped and unescaped.
     */
    setPropertyWithoutEscape(name: string, value: any): void;
    /**
     *
     * @param {number} line The number (starting with 1)
     * @param {number} column The column number (starting with 1)
     */
    isAtPosition(line: number, column: number): boolean;
    stringifyProperty(name: any): any;
    set rawSpaceBefore(arg: any);
    get rawSpaceBefore(): any;
    set rawSpaceAfter(arg: any);
    get rawSpaceAfter(): any;
    valueToString(): string;
    toString(): string;
}
