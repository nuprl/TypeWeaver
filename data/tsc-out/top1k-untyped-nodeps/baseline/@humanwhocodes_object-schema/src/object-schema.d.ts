/**
 * Represents an object validation/merging schema.
 */
export class ObjectSchema {
    /**
     * Creates a new instance.
     */
    constructor(definitions: any);
    /**
     * Determines if a strategy has been registered for the given object key.
     * @param {string} key The object key to find a strategy for.
     * @returns {boolean} True if the key has a strategy registered, false if not.
     */
    hasKey(key: string): boolean;
    /**
     * Merges objects together to create a new object comprised of the keys
     * of the all objects. Keys are merged based on the each key's merge
     * strategy.
     * @param {...Object} objects The objects to merge.
     * @returns {Object} A new object with a mix of all objects' keys.
     * @throws {Error} If any object is invalid.
     */
    merge(...objects: any[]): any;
    /**
     * Validates an object's keys based on the validate strategy for each key.
     * @param {Object} object The object to validate.
     * @returns {void}
     * @throws {Error} When the object is invalid.
     */
    validate(object: any): void;
    /**
     * Track all strategies in the schema by key.
     * @type {Map}
     * @property strategies
     */
    [strategies]: Map<any, any>;
    /**
     * Separately track any keys that are required for faster validation.
     * @type {Map}
     * @property requiredKeys
     */
    [requiredKeys]: Map<any, any>;
}
declare const strategies: unique symbol;
declare const requiredKeys: unique symbol;
export {};
