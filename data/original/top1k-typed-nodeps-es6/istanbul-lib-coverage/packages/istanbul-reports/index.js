'use strict';

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import path from 'path';

export default {
    create(name, cfg) {
        cfg = cfg || {};
        let Cons;
        try {
            Cons = require(path.join(__dirname, 'lib', name));
        } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
                throw e;
            }

            Cons = require(name);
        }

        return new Cons(cfg);
    }
};
