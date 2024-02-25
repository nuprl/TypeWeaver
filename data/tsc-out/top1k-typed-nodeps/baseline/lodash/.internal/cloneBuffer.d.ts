export default cloneBuffer;
/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
declare function cloneBuffer(buffer: Buffer, isDeep?: boolean): Buffer;
declare const Buffer: any;
