export default class DescriptionFilePlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, filenames: string[], pathIsFile: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    filenames: string[];
    pathIsFile: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
