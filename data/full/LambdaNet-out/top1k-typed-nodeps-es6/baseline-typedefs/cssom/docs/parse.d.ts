declare function byId(id: string): Map;
declare function makeIndent(depth: string): string;
declare namespace makeIndent {
    var cache: {};
}
declare function stringifyObjectKey(key: string): string;
declare function inspect(object: object): object;
declare var style: HTMLElement;
declare var output: HTMLElement;
declare var serialized: HTMLElement;
declare function outputUpdated(): void;
declare function hashChanged(): boolean;
