export default GNTP;
declare function GNTP(type: string, opts: any): void;
declare class GNTP {
    constructor(type: string, opts: any);
    type: string;
    host: any;
    port: any;
    request: string;
    resources: any[];
    attempts: number;
    maxAttempts: number;
    parseResp(resp: string): any;
    retry(...args: any[]): void;
    addResource(file: Buffer): string;
    add(name: string, val: string): void;
    newline(): void;
    send(callback: Function): void;
}
