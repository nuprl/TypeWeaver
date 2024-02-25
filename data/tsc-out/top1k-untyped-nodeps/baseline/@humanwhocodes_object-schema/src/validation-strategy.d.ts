/**
 * Container class for several different validation strategies.
 */
export class ValidationStrategy {
    /**
     * Validates that a value is an array.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static array(value: any): void;
    /**
     * Validates that a value is a boolean.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static boolean(value: any): void;
    /**
     * Validates that a value is a number.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static number(value: any): void;
    /**
     * Validates that a value is a object.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static object(value: any): void;
    /**
     * Validates that a value is a object or null.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static "object?"(value: any): void;
    /**
     * Validates that a value is a string.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static string(value: any): void;
    /**
     * Validates that a value is a non-empty string.
     * @param {*} value The value to validate.
     * @returns {void}
     * @throws {TypeError} If the value is invalid.
     */
    static "string!"(value: any): void;
}
