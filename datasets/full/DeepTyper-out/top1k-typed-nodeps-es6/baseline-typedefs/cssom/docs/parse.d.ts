declare function byId(id: string): any;
declare function makeIndent(depth: number): string;
declare namespace makeIndent {
    var cache: {};
}
declare function stringifyObjectKey(key: string): string;
declare function inspect(object: any): any;
declare var style: CSSStyleDeclaration;
declare var output: any;
declare var serialized: string;
declare function outputUpdated(): void;
declare function hashChanged(): string;
