export declare const config: {
    specs: string[];
    user: string;
    key: string;
    services: ((string | {
        folders: {
            mount: string;
            path: string;
        }[];
        port: number;
    })[] | (string | {
        browserstackLocal: boolean;
    })[])[];
    runner: string;
    maxInstances: number;
    capabilities: {
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
    logLevel: string;
    bail: number;
    waitforTimeout: number;
    connectionRetryTimeout: number;
    connectionRetryCount: number;
    framework: string;
    jasmineOpts: {
        defaultTimeoutInterval: number;
    };
    reporters: string[];
};
