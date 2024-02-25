export = LogInfoPlugin;
declare class LogInfoPlugin {
    constructor(source: any);
    source: any;
    apply(resolver: Resolver): void;
}
declare namespace LogInfoPlugin {
    export { Resolver };
}
type Resolver = import("./Resolver");
