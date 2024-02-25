declare function getSupportLevel(stream: any): false | {
    level: any;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
export { getSupportLevel as supportsColor };
export declare const stdout: boolean | {
    level: any;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
export declare const stderr: boolean | {
    level: any;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
