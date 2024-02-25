export default GNTP;
/**
 * Create a new GNTP request of the given `type`.
 *
 * @param {String} type either NOTIFY or REGISTER
 * @api private
 */
declare function GNTP(type: string, opts: any): void;
declare class GNTP {
    /**
     * Create a new GNTP request of the given `type`.
     *
     * @param {String} type either NOTIFY or REGISTER
     * @api private
     */
    constructor(type: string, opts: any);
    type: string;
    host: any;
    port: any;
    request: string;
    resources: any[];
    attempts: number;
    maxAttempts: number;
    /**
     * Build a response object from the given `resp` response string.
     *
     * The response object has a key/value pair for every header in the response, and
     * a `.state` property equal to either OK, ERROR, or CALLBACK.
     *
     * An example GNTP response:
     *
     *     GNTP/1.0 -OK NONE\r\n
     *     Response-Action: REGISTER\r\n
     *     \r\n
     *
     *  Which would parse to:
     *
     *      { state: 'OK', 'Response-Action': 'REGISTER' }
     *
     * @param {String} resp
     * @return {Object}
     * @api private
     */
    parseResp(resp: string): any;
    /**
     * Call `GNTP.send()` with the given arguments after a certain delay.
     *
     * @api private
     */
    retry(...args: any[]): void;
    /**
     * Add a resource to the GNTP request.
     *
     * @param {Buffer} file
     * @return {String}
     * @api private
     */
    addResource(file: Buffer): string;
    /**
     * Append another header `name` with a value of `val` to the request. If `val` is
     * undefined, the header will be left out.
     *
     * @param {String} name
     * @param {String} val
     * @api public
     */
    add(name: string, val: string): void;
    /**
     * Append a newline to the request.
     *
     * @api public
     */
    newline(): void;
    /**
     * Send the GNTP request, calling `callback` after successfully sending the
     * request.
     *
     * An example GNTP request:
     *
     *     GNTP/1.0 REGISTER NONE\r\n
     *     Application-Name: Growly.js\r\n
     *     Notifications-Count: 1\r\n
     *     \r\n
     *     Notification-Name: default\r\n
     *     Notification-Display-Name: Default Notification\r\n
     *     Notification-Enabled: True\r\n
     *     \r\n
     *
     * @param {Function} callback which will be passed the parsed response
     * @api public
     */
    send(callback: Function): void;
}
