/**
 * Supply a warning to the developer that a method they are using
 * has been deprecated.
 *
 * @param {string} method The name of the deprecated method
 * @param {string} [instead] The alternate method to use if applicable
 * @param {string} [docs] The documentation URL to get further details
 *
 * @returns {void}
 */
export default function deprecatedMethod(method: string, instead?: string, docs?: string): void;
