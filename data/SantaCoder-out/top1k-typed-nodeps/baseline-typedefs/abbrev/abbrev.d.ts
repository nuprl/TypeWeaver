declare function monkeyPatch(): void;
declare function abbrev(list: Array<string>): {};
declare namespace abbrev {
    var abbrev: typeof globalThis.abbrev;
    var monkeyPatch: typeof globalThis.monkeyPatch;
}
declare function lexSort(a: string, b: string): 0 | 1 | -1;
