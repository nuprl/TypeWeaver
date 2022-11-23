declare function monkeyPatch(): void;
declare function abbrev(list: any): any;
declare namespace abbrev {
    var abbrev: typeof globalThis.abbrev;
    var monkeyPatch: typeof globalThis.monkeyPatch;
}
declare function lexSort(a: string, b: any): boolean;
