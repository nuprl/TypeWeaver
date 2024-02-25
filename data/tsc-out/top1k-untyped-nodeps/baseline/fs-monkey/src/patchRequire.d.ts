/**
 * Rewrites `modules.js`, which is the factory for the `require` function.
 * You give this function your custom file system object and this function
 * will patch `module.js` to use that instead of the built-it `fs.js` file system.
 *
 * This function expects an object with three methods:
 *
 *     patchRequire({
 *         readFileSync: () => {},
 *         realpathSync: () => {},
 *         statSync: () => {},
 *     });
 *
 * The methods should behave like the ones on the native `fs` object.
 *
 * @param {Object} vol
 * @param {boolean} [unixifyPaths=false]
 * @param {Object} Module Module loader to patch.
 */
export default function patchRequire(vol: any, unixifyPaths?: boolean, Module?: any): void;
