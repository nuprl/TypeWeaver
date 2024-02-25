export = anymatch;
declare function anymatch(matchers: AnymatchMatcher, testString: any[] | string, options?: object): boolean | number | Function;
declare namespace anymatch {
    export { anymatch as default, __esModule, AnymatchFn, AnymatchPattern, AnymatchMatcher };
}
type AnymatchMatcher = AnymatchPattern | AnymatchPattern[];
declare const __esModule: boolean;
type AnymatchFn = (testString: string) => boolean;
type AnymatchPattern = string | RegExp | AnymatchFn;
