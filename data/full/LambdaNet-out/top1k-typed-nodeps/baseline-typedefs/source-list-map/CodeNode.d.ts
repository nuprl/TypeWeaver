declare const getNumberOfLines: Function;
declare const getUnfinishedLine: Function;
declare class CodeNode {
    constructor(generatedCode: any);
    clone(): any;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    addGeneratedCode(generatedCode: any): void;
    mapGeneratedCode(fn: any): any;
    getNormalizedNodes(): this[];
    merge(otherNode: any): false | this;
}
