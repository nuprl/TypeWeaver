'use strict';

import path from 'path';
import pkgUp from './pkgUp';

export const __esModule = true;

export const default = function (cwd) {
  const fp = pkgUp({ cwd });
  return fp ? path.dirname(fp) : null;
};
