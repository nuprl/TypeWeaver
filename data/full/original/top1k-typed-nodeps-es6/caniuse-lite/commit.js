import { execSync } from 'child_process';
import pkg from './package.json';

execSync('git add data/ package.json pnpm-lock.yaml')
execSync(`git commit -m "Update caniuse-db ${pkg.version}"`)
execSync(`git tag -m "Release caniuse-db ${pkg.version}" ${pkg.version}`)
