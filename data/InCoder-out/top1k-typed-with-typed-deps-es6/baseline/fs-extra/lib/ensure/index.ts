'use strict'

import { createFile, createFileSync } from './file';
import { createLink, createLinkSync } from './link';
import { createSymlink, createSymlinkSync } from './symlink';

export default {
  // file
  createFile,
  createFileSync,
  ensureFile: createFile,
  ensureFileSync: createFileSync,
  // link
  createLink,
  createLinkSync,
  ensureLink: createLink,
  ensureLinkSync: createLinkSync,
  // symlink
  createSymlink,
  createSymlinkSync,
  ensureSymlink: createSymlink,
  ensureSymlinkSync: createSymlinkSync
};