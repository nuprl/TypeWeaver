import { copyFileSync } from 'fs';
import { join } from 'path';

const src: string = join(__dirname, "src", "index.js");
const target: string = join(__dirname, "lib", "index.mjs");
copyFileSync(src, target);
