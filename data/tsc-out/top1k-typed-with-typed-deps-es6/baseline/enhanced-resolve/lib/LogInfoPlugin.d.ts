/** @typedef {import("./Resolver")} Resolver */
export default class LogInfoPlugin {
    constructor(source: any);
    source: any;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
