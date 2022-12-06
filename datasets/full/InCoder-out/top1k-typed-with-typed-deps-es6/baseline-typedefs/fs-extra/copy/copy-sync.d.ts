/// <reference types="node" />
import fs from 'graceful-fs';
declare function copySync(src: fs.Stats, dest: fs.Stats, opts: any): void;
export default copySync;
