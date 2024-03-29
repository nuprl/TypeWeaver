/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

/**
 * A regexp-tree plugin to remove `x` flag `/foo/x` to `/foo/`.
 *
 * Note: other features of `x` flags (whitespace, comments) are
 * already removed at parsing stage.
 */
export default {
  RegExp({node}) {
    if (node.flags.includes('x')) {
      node.flags = node.flags.replace('x', '');
    }
  },
};