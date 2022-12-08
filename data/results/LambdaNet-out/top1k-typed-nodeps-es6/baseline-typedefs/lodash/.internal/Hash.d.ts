declare class Hash {
    constructor(entries: any);
    clear(): void;
    delete(key: any): boolean;
    get(key: any): string;
    has(key: any): boolean;
    set(key: any, value: any): this;
}
export default Hash;
