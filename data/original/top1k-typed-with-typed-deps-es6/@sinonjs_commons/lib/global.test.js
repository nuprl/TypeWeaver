"use strict";

import { assert } from '@sinonjs/referee-sinon';
import globalObject from './global';

describe("global", function() {
    before(function() {
        if (typeof global === "undefined") {
            this.skip();
        }
    });

    it("is same as global", function() {
        assert.same(globalObject, global);
    });
});
