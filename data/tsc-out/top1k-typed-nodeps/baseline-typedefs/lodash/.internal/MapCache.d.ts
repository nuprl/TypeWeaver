export default MapCache;
declare class MapCache {
    private constructor();
    clear(): void;
    size: number;
    __data__: {
        hash: any;
        map: Map<any, any>;
        string: any;
    };
    delete(key: string): boolean;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: any): any;
}
