export function Client(options: any): void;
export class Client {
    constructor(options: any);
    watchmanBinaryPath: any;
    commands: any[];
    sendNextCommand(): void;
    currentCommand: any;
    cancelCommands(why: any): void;
    connect(): void;
    command(args: any, done: any): void;
    connecting: boolean;
    _synthesizeCapabilityCheck(resp: any, optional: any, required: any): any;
    capabilityCheck(caps: any, done: any): void;
    end(): void;
    socket: any;
    bunser: any;
}
