export namespace npm {
    export { npmPrefix as prefix };
    export const packages: string;
    export const binaries: string;
}
export namespace yarn {
    export { yarnPrefix as prefix };
    const packages_1: string;
    export { packages_1 as packages };
    const binaries_1: string;
    export { binaries_1 as binaries };
}
declare const npmPrefix: string;
declare const yarnPrefix: string;
export {};
