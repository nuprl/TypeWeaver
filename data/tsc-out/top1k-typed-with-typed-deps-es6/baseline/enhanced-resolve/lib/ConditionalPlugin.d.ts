/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
export default class ConditionalPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {Partial<ResolveRequest>} test compare object
     * @param {string | null} message log message
     * @param {boolean} allowAlternatives when false, do not continue with the current step when "test" matches
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, test: Partial<ResolveRequest>, message: string | null, allowAlternatives: boolean, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    test: Partial<import("./Resolver").ResolveRequest>;
    message: string;
    allowAlternatives: boolean;
    target: string | import("./Resolver").ResolveStepHook;
    /**
     * @param {Resolver} resolver the resolver
     * @returns {void}
     */
    apply(resolver: Resolver): void;
}
export type Resolver = typeof import("./Resolver");
export type ResolveRequest = import("./Resolver").ResolveRequest;
export type ResolveStepHook = import("./Resolver").ResolveStepHook;
