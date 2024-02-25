export = LogInfoPlugin;
declare class LogInfoPlugin {
    constructor(source: any);
    source: any;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
declare namespace LogInfoPlugin {
    export { Resolver };
}
type Resolver = import("./Resolver");
