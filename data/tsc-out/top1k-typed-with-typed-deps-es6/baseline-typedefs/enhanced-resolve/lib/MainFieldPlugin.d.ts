export default class MainFieldPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, options: MainFieldOptions, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: MainFieldOptions;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type MainFieldOptions = {
    name: string | Array<string>;
    forceRelative: boolean;
};
