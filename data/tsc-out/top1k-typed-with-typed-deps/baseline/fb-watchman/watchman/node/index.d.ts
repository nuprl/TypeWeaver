/**
 * @param options An object with the following optional keys:
 *   * 'watchmanBinaryPath' (string) Absolute path to the watchman binary.
 *     If not provided, the Client locates the binary using the PATH specified
 *     by the node child_process's default env.
 */
export function Client(options: any): void;
export class Client {
    /**
     * @param options An object with the following optional keys:
     *   * 'watchmanBinaryPath' (string) Absolute path to the watchman binary.
     *     If not provided, the Client locates the binary using the PATH specified
     *     by the node child_process's default env.
     */
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
