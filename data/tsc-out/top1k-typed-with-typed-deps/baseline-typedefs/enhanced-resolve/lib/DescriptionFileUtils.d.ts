export type Resolver = import("./Resolver");
export type ResolveContext = import("./Resolver").ResolveContext;
export type DescriptionFileInfo = {
    content?: any | undefined;
    path: string;
    directory: string;
};
export type ErrorFirstCallback = (error?: (Error | null) | undefined, result?: DescriptionFileInfo | undefined) => any;
export function loadDescriptionFile(resolver: Resolver, directory: string, filenames: string[], oldInfo: DescriptionFileInfo | undefined, resolveContext: ResolveContext, callback: ErrorFirstCallback): void;
export function getField(content: any, field: string | string[]): object | string | number | boolean | undefined;
export function cdUp(directory: string): string | null;
