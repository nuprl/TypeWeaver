#!/usr/bin/env node
var colorSupport: any[] = require('./')({alwaysReturn: true })
console.log(JSON.stringify(colorSupport, null, 2))
