export default class CloneBasenamePlugin {
    constructor(source: any, target: any);
    source: any;
    target: any;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
