export default class LogInfoPlugin {
    constructor(source: any);
    source: any;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
