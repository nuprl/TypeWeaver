export namespace config {
    export const specs: string[];
    export const user: string;
    export const key: string;
    export const services: ((string | {
        folders: {
            mount: string;
            path: string;
        }[];
        port: number;
    })[] | (string | {
        browserstackLocal: boolean;
    })[])[];
    export const runner: string;
    export const maxInstances: number;
    export { capabilities };
    export const logLevel: string;
    export const bail: number;
    export const waitforTimeout: number;
    export const connectionRetryTimeout: number;
    export const connectionRetryCount: number;
    export const framework: string;
    export namespace jasmineOpts {
        const defaultTimeoutInterval: number;
    }
    export const reporters: string[];
}
declare const capabilities: {
    'bstack:options': {
        os: string;
        osVersion: string;
        projectName: string;
        buildName: string;
        sessionName: string;
        resolution: string;
    };
    browserName: string;
    browserVersion: string;
}[];
export {};
