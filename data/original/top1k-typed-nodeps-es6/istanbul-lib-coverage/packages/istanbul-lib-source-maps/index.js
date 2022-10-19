/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

import { MapStore } from './lib/map-store';

/**
 * @module Exports
 */
export default {
    createSourceMapStore(opts) {
        return new MapStore(opts);
    }
};
