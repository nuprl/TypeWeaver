/// <reference types="node" />
export = etag;
/**
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @public
 */
declare function etag(entity: string | Buffer | Stats, options?: {
    weak?: boolean;
}): string;
import Stats_1 = require("fs");
import Stats = Stats_1.Stats;
