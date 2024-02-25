declare const makeDir: (...args: any[]) => void | Promise<any>;
import { makeDirSync } from "./make-dir";
export { makeDir as mkdirs, makeDirSync as mkdirsSync, makeDir as mkdirp, makeDirSync as mkdirpSync, makeDir as ensureDir, makeDirSync as ensureDirSync };
