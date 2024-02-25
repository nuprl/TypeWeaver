export = CloneBasenamePlugin;
declare class CloneBasenamePlugin {
    constructor(source: any, target: any);
    source: any;
    target: any;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace CloneBasenamePlugin {
    export { Resolver };
}
type Resolver = import("./Resolver");
