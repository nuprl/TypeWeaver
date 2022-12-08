declare const Session: any;
declare const promisify: any;
declare class CoverageInstrumenter {
    constructor();
    startInstrumenting(): Promise<void>;
    stopInstrumenting(): Promise<any>;
}
