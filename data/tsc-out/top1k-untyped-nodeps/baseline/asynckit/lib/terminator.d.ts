export = terminator;
/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
declare function terminator(this: AsyncKitState, callback: Function): void;
declare class terminator {
    /**
     * Terminates jobs in the attached state context
     *
     * @this  AsyncKitState#
     * @param {function} callback - final callback to invoke after termination
     */
    constructor(this: AsyncKitState, callback: Function);
    index: any;
}
