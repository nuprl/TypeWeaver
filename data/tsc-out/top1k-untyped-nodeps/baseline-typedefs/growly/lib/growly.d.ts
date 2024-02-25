declare const _exports: Growly;
export = _exports;
declare function Growly(): void;
declare class Growly {
    appname: string;
    notifications: any[];
    labels: any[];
    count: number;
    registered: boolean;
    host: string;
    port: number;
    getLabels(): any[];
    setHost(host: string, port: number): void;
    register(appname: string, appicon: string | Buffer, notifications: any[], callback: Function, ...args: any[]): void;
    notify(text: string, opts: any, callback: Function): void;
}
