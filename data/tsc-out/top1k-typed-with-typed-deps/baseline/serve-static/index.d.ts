export = serveStatic;
/**
 * @param {string} root
 * @param {object} [options]
 * @return {function}
 * @public
 */
declare function serveStatic(root: string, options?: object): Function;
declare namespace serveStatic {
    export { mime };
}
