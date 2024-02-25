export = typeofrequest;
declare function typeofrequest(req: any, types_: any, ...args: any[]): string | false | null;
declare namespace typeofrequest {
    export { typeis as is, hasbody as hasBody, normalize, mimeMatch as match };
}
declare function typeis(value: string, types_: any, ...args: any[]): any;
declare function hasbody(req: any): boolean;
declare function normalize(type: string): string | false | null;
declare function mimeMatch(expected: string, actual: string): boolean;
