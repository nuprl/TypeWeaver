declare const PORT = 9000;
declare const PROJECT: string;
declare const GITHUB_SHA: string;
declare const GITHUB_REF: string;
declare const BUILD: string;
declare const commonCapabilities: {
    projectName: string;
    buildName: string;
    sessionName: string;
    resolution: string;
};
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
