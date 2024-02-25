export = CloneBasenamePlugin;
declare class CloneBasenamePlugin {
    constructor(source: any, target: any);
    source: any;
    target: any;
    apply(resolver: Resolver): void;
}
declare namespace CloneBasenamePlugin {
    export { Resolver };
}
type Resolver = import("./Resolver");
