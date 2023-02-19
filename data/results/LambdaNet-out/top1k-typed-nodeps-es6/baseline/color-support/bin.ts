#!/usr/bin/env node
import colorSupportFactory from './';
const colorSupport: string = colorSupportFactory({alwaysReturn: true });
console.log(JSON.stringify(colorSupport, null, 2))
