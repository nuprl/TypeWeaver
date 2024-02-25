/// <reference types="node" />
export = etag;
declare function etag(entity: string | Buffer | Stats, options?: {
    weak?: boolean;
}): string;
import Stats_1 = require("fs");
import Stats = Stats_1.Stats;
