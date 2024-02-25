export type Resolver = typeof import("./Resolver");
export type ResolveContext = import("./Resolver").ResolveContext;
export type DescriptionFileInfo = {
    content?: any | undefined;
    path: string;
    directory: string;
};
export type ErrorFirstCallback = (error?: (Error | null) | undefined, result?: DescriptionFileInfo | undefined) => any;
