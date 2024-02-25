declare function Diff(): void;
declare class Diff {
    diff(oldString: any, newString: any, options?: {}): any;
    options: {};
    pushComponent(components: any, added: any, removed: any): void;
    extractCommon(basePath: any, newString: any, oldString: any, diagonalPath: any): number;
    equals(left: any, right: any): any;
    removeEmpty(array: any): any[];
    castInput(value: any): any;
    tokenize(value: any): any;
    join(chars: any): any;
}
export default Diff;
