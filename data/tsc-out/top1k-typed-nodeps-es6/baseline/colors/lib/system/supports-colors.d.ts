declare namespace _default {
    export { getSupportLevel as supportsColor };
    export const stdout: boolean | {
        level: any;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
    export const stderr: boolean | {
        level: any;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
}
export default _default;
declare function getSupportLevel(stream: any): false | {
    level: any;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
