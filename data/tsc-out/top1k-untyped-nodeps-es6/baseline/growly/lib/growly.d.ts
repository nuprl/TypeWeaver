declare const _default: Growly;
export default _default;
/**
 * Interface for registering Growl applications and sending Growl notifications.
 *
 * @api private
 */
declare function Growly(): void;
declare class Growly {
    appname: string;
    notifications: any[];
    labels: any[];
    count: number;
    registered: boolean;
    host: string;
    port: number;
    /**
     * Returns an array of label strings extracted from each notification object in
     * `Growly.notifications`.
     *
     * @param {Array} notifications
     * @return {Array} notification labels
     * @api private
     */
    getLabels(): any[];
    /**
     * Set the host to be used by GNTP requests.
     *
     * @param {String} host
     * @param {Number} port
     * @api public
     */
    setHost(host: string, port: number): void;
    /**
     * Register an application with the name `appname` (required), icon `appicon`, and
     * a list of notification types `notifications`. If provided, `callback` will be
     * called when the request completes with the first argument being an `err` error
     * object if the request failed.
     *
     * Each object in the `notifications` array defines a type of notification the
     * application will have with the following properties:
     *
     *  - `.label` name used to identify the type of notification being used (required)
     *  - `.dispname` name users will see in Growl's preference panel (defaults to `.label`)
     *  - `.enabled` whether or not notifications of this type are enabled (defaults to true)
     *  - `.icon` default icon notifications of this type should use (url, file path, or Buffer object)
     *
     *  Example registration:
     *
     *      growl.register('My Application', 'path/to/icon.png', [
     *          { label: 'success', dispname: 'Success', icon: 'path/to/success.png' },
     *          { label: 'warning', dispname: 'Warning', icon: 'path/to/warning.png', enabled: false }
     *      ], function(err) { console.log(err || 'Registration successful!'); });
     *
     * @param {String} appname
     * @param {String|Buffer} appicon
     * @param {Array} notifications
     * @param {Function} callback
     * @api public
     */
    register(appname: string, appicon: string | Buffer, notifications: any[], callback: Function, ...args: any[]): void;
    /**
     * Send a notification with `text` content. Growly will lazily register itself
     * if the user hasn't already before sending the notification.
     *
     * A notification can have the following `opts` options:
     *
     *  - `.label` type of notification to use (defaults to the first registered type)
     *  - `.title` title of the notification
     *  - `.icon` url, file path, or Buffer instance for the notification's icon.
     *  - `.sticky` whether or not to sticky the notification (defaults to false)
     *  - `.priority` the priority of the notification from lowest (-2) to highest (2)
     *  - `.coalescingId` replace/update the matching previous notification. May be ignored.
     *
     * If provided, `callback` will be called when the user interacts with the notification.
     * The first argument will be an `err` error object, and the second argument an `action`
     * string equal to either 'clicked' or 'closed' (whichever action the user took.)
     *
     * Example notification:
     *
     *     growl.notify('Stuffs broken!', { label: 'warning' }, function(err, action) {
     *         console.log('Action:', action);
     *     });
     *
     * @param {String} text
     * @param {Object} opts
     * @param {Function} callback
     * @api public
     */
    notify(text: string, opts: any, callback: Function): void;
}
