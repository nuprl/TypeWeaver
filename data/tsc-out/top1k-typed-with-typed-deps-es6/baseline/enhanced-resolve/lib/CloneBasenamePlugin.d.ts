/** @typedef {import("./Resolver")} Resolver */
export default class CloneBasenamePlugin {
    constructor(source: any, target: any);
    source: any;
    target: any;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
