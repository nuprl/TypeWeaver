export default MapCache;
declare function MapCache(data: any): void;
declare class MapCache {
    constructor(data: any);
    __data__: any;
    set(key: string, value: any): any;
    get(key: string): any;
    has(key: string): boolean;
    del(key: string): boolean;
}
