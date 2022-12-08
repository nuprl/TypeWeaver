declare function monkeyPatch(): void;
declare function abbrev(list: any[]): object;
declare namespace abbrev {
    var abbrev: typeof globalThis.abbrev;
    var monkeyPatch: typeof globalThis.monkeyPatch;
}
declare function lexSort(a: number, b: number): number;
