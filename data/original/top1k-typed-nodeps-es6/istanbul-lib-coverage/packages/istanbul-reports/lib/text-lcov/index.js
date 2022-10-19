'use strict';

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import LcovOnly from '../lcovonly';

class TextLcov extends LcovOnly {
    constructor(opts) {
        super({
            ...opts,
            file: '-'
        });
    }
}

export default TextLcov;
