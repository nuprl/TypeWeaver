/// <reference types="node" />
declare function getSupportLevel(stream: NodeJS.WriteStream): false | {
    level: number;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
declare const _default: {
    supportsColor: typeof getSupportLevel;
    stdout: boolean | {
        level: number;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
    stderr: boolean | {
        level: number;
        hasBasic: boolean;
        has256: boolean;
        has16m: boolean;
    };
};
export default _default;
