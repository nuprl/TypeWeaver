export default class PnpPlugin {
    constructor(source: string | import("./Resolver").ResolveStepHook, pnpApi: PnpApiImpl, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    pnpApi: PnpApiImpl;
    target: string | import("./Resolver").ResolveStepHook;
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
export type PnpApiImpl = {
    resolveToUnqualified: (arg0: string, arg1: string, arg2: object) => string;
};
