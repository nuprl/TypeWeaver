export default orderByFirstCall;
/**
 * A Sinon proxy object (fake, spy, stub)
 */
export type SinonProxy = {
    /**
     * - A method that can return the first call
     */
    getCall: Function;
};
/**
 * A Sinon proxy object (fake, spy, stub)
 *
 * @typedef {object} SinonProxy
 * @property {Function} getCall - A method that can return the first call
 */
/**
 * Sorts an array of SinonProxy instances (fake, spy, stub) by their first call
 *
 * @param  {SinonProxy[] | SinonProxy} spies
 * @returns {SinonProxy[]}
 */
declare function orderByFirstCall(spies: SinonProxy[] | SinonProxy): SinonProxy[];
