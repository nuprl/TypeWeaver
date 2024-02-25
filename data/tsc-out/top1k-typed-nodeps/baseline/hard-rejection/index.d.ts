export = hardRejection;
declare function hardRejection(log?: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}): void;
declare namespace hardRejection {
    export { hardRejection as default };
}
