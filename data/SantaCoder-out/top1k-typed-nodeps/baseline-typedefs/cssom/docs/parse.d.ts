declare function byId(id: string): HTMLElement;
declare function makeIndent(depth: number): string;
declare namespace makeIndent {
    var cache: {};
}
declare function stringifyObjectKey(key: string): string;
declare function inspect(object: any): DocumentFragment;
declare var style: HTMLElement;
declare var output: HTMLElement;
declare var serialized: HTMLElement;
declare function outputUpdated(): void;
declare function hashChanged(): boolean;
