/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

import path from 'path';

export default {
    isAbsolute: path.isAbsolute,
    asAbsolute(file, baseDir) {
        return path.isAbsolute(file)
            ? file
            : path.resolve(baseDir || process.cwd(), file);
    },
    relativeTo(file, origFile) {
        return path.isAbsolute(file)
            ? file
            : path.resolve(path.dirname(origFile), file);
    }
};
