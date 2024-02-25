export default anymatch;
export type AnymatchFn = (testString: string) => boolean;
export type AnymatchPattern = string | RegExp | AnymatchFn;
export type AnymatchMatcher = AnymatchPattern | AnymatchPattern[];
declare function anymatch(matchers: AnymatchMatcher, testString: any[] | string, options?: object): boolean | number | Function;
declare namespace anymatch {
    export { anymatch as default };
}
