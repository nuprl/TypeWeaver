export = execSh;
/**
 * Callback is called with the output when the process terminates. Output is
 * available when true is passed as options argument or stdio: null set
 * within given options.
 *
 * @summary Execute shell command forwarding all stdio
 * @param {String|Array} command
 * @param {Object|TRUE} [options] spawn() options or TRUE to set stdio: null
 * @param {Function} [callback]
 * @returns {ChildProcess}
 */
declare function execSh(command: string | any[], options?: any | TRUE, callback?: Function): ChildProcess;
declare namespace execSh {
    function promise(command: any, options: any): Promise<any>;
}
