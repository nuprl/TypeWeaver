declare const fs: string;
declare const path: string;
declare const EXPECTED_ERRORS: Error;
declare class LinkResolver {
    constructor();
    resolve(file: any): string | Function | any[];
}
