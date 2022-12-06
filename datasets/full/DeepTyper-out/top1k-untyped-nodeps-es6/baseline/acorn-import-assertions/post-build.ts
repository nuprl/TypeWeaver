import { copyFileSync } from 'fs';
import { join } from 'path';

const src: any = join(__dirname, "src", "index.js");
const target: any = join(__dirname, "lib", "index.mjs");
copyFileSync(src, target);
