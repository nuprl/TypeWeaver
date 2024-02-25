export default YAMLException;
declare function YAMLException(reason: any, mark: any): void;
declare class YAMLException {
    constructor(reason: any, mark: any);
    name: string;
    reason: any;
    mark: any;
    message: any;
    stack: string;
    constructor: typeof YAMLException;
    toString(compact: any): string;
}
