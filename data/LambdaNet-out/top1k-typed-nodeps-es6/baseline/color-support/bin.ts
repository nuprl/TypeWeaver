#!/usr/bin/env node
import colorSupportFactory from './';
const colorSupport: String = colorSupportFactory({alwaysReturn: true });
console.log(JSON.stringify(colorSupport, null, 2))
