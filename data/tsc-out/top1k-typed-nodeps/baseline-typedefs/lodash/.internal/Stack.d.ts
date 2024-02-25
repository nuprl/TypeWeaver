export default Stack;
declare class Stack {
    private constructor();
    __data__: any;
    size: any;
    clear(): void;
    delete(key: string): boolean;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: any): any;
}
