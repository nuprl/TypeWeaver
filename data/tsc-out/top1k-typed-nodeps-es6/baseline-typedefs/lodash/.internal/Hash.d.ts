export default Hash;
declare class Hash {
    private constructor();
    clear(): void;
    __data__: any;
    size: number;
    delete(key: string): boolean;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: any): any;
}
