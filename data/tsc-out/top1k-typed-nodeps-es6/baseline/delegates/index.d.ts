export default Delegator;
/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */
declare function Delegator(proto: any, target: string): Delegator;
declare class Delegator {
    /**
     * Initialize a delegator.
     *
     * @param {Object} proto
     * @param {String} target
     * @api public
     */
    constructor(proto: any, target: string);
    proto: any;
    target: string;
    methods: any[];
    getters: any[];
    setters: any[];
    fluents: any[];
    /**
     * Delegate method `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */
    method(name: string): Delegator;
    /**
     * Delegator accessor `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */
    access(name: string): Delegator;
    /**
     * Delegator getter `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */
    getter(name: string): Delegator;
    /**
     * Delegator setter `name`.
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */
    setter(name: string): Delegator;
    /**
     * Delegator fluent accessor
     *
     * @param {String} name
     * @return {Delegator} self
     * @api public
     */
    fluent(name: string): Delegator;
}
declare namespace Delegator {
    /**
     * Automatically delegate properties
     * from a target prototype
     *
     * @param {Object} proto
     * @param {object} targetProto
     * @param {String} targetProp
     * @api public
     */
    function auto(proto: any, targetProto: any, targetProp: string): void;
}
