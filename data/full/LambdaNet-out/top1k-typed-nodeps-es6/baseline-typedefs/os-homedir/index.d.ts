/// <reference types="node" />
import os from 'os';
declare function homedir(): boolean;
declare const _default: typeof os.homedir | typeof homedir;
export default _default;
