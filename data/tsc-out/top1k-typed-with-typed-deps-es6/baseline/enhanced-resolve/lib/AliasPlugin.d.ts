/** @typedef {import("./Resolver")} Resolver */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").ResolveStepHook} ResolveStepHook */
/** @typedef {{alias: string|Array<string>|false, name: string, onlyModule?: boolean}} AliasOption */
export default class AliasPlugin {
    /**
     * @param {string | ResolveStepHook} source source
     * @param {AliasOption | Array<AliasOption>} options options
     * @param {string | ResolveStepHook} target target
     */
    constructor(source: string | import("./Resolver").ResolveStepHook, options: AliasOption | Array<AliasOption>, target: string | import("./Resolver").ResolveStepHook);
    source: string | import("./Resolver").ResolveStepHook;
    options: AliasOption[];
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
export type AliasOption = {
    alias: string | Array<string> | false;
    name: string;
    onlyModule?: boolean;
};
