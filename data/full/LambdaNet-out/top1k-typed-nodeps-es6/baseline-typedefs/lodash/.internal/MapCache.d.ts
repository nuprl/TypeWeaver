declare class MapCache {
    constructor(entries: any);
    clear(): void;
    delete(key: any): string;
    get(key: any): any;
    has(key: any): any;
    set(key: any, value: any): this;
}
export default MapCache;
