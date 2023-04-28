/// <reference types="node" />
declare var os: any;
declare var hasFlag: any;
declare var env: NodeJS.ProcessEnv;
declare var forceColor: any;
declare function translateLevel(level: number): false | {
    level: number;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
declare function supportsColor(stream: NodeJS.WriteStream): number;
declare function getSupportLevel(stream: NodeJS.WriteStream): false | {
    level: number;
    hasBasic: boolean;
    has256: boolean;
    has16m: boolean;
};
